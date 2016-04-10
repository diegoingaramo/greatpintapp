/* Authentication services */

var authInterceptor = function(auth) {
  return {
    // automatically attach Authorization header
    request: function(config) {
      var token = auth.getToken();
      if(config.url.indexOf('http')!=0 && token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },

    // If a token was sent back, save it
    response: function(res) {
      if(res.config.url.indexOf('http')!=0 && res.data.token) {
        auth.saveToken(res.data.token);
      }
      return res;
    },
      
  }
};

var authService = function($window) {
    
  var self = this;

  self.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  };
    
  self.saveToken = function(token) {
    $window.localStorage['jwtToken'] = token;
  };
    
  self.getToken = function() {
    return $window.localStorage['jwtToken'];
  };
    
  self.isAuthed = function(){
    var token = self.getToken();
    if(token) {
        return true;
    } else {
        return false;
    }
  };
    
  self.logout = function() {
    $window.localStorage.removeItem('jwtToken');
    $window.localStorage.removeItem('user');
  };
    
};

var userService = function($http, auth, $window) {
    
  var self = this;
    
  self.init = function(){
      OAuth.initialize('CwgeJO-j28bHeThunMwNKDYi6C4');
  };
    
  self.signup = function(username, password, rpassword) {
  return $http.post('users/signup', {
      username: username,
      password: password,
      rpassword: rpassword
    }).then(function(result) {
          if (result.data.success){
             $window.localStorage.setItem('user',JSON.stringify(result.data.user));
          }
          return result;
      });
  };
    
    
  self.tSignup = function(username, id) {
  return $http.post('users/tSignup', {
      username: username,
      id: id
    }).then(function(result) {
          if (result.data.success){
             $window.localStorage.setItem('user',JSON.stringify(result.data.user));
          }
          return result;
      });
  };
    
  self.login = function(username, password) {
      return $http.post('users/login', {
          username: username,
          password: password
      }).then(function(result) {
          if (result.data.success){
            $window.localStorage.setItem('user',JSON.stringify(result.data.user));
          }
          return result;
      });
  };
    
  self.tLogin = function() {
    return new Promise(function(resolve, reject){
        if (!auth.isAuthed()){
          OAuth.popup('twitter').done(function(result) {
            result.me().done(function(data) {
                self.tSignup(data.alias,data.id).then(function(result) {
                   if (result.data.success){
                       resolve();
                   }
                    else{
                        //console.error('error: ', error);
                        reject();
                    }
               }, function(reason) {
                 console.error('error: ', reason);
                 reject();
               });
            });
          }).fail(function (error) {
                console.error('error: ', error);
                reject();
          });
        }else {
            resolve();
        }
      });
  };
    
    
  self.currentUser = function() {
    if ($window.localStorage.getItem('user'))
      return JSON.parse($window.localStorage.getItem('user'));
    else
      return {};
  };
    
};


/* End authentication services */


/* Image service */

var imageService = function($http) {
    
  var self = this;
        
  self.search = function(user) {
      return $http.post('book/mybooks', {
              email: user.email,
          }).then(function(result) {
              return result;
          });
  };
    
  self.save = function(user,image) {
      return $http.post('image/save', {
              user: user,
              image: image
          }).then(function(result) {
              return result;
       });
  };
    

};


/* End image service */


/* Main controller definition */

AppController.$routeConfig = [
    { path: '/recent', component: 'recent', as:'recent' },
    { path: '/addpin', component: 'add_pin', as:'addpin' },
    { path: '/mypins', component: 'my_pins', as:'mypins' },
];

function AppController($scope, $router, user, auth, $location) {
    
  $scope.init = function() {
      user.init();
  }
    
  $scope.isAuthed = function() {
    return auth.isAuthed ? auth.isAuthed() : false
  };
    
  $scope.getUser = function(){
      return user.currentUser();
  }
  
  $scope.init();

    
};

/* End main controller definition */

var app = angular.module('appMain', ['ngNewRouter','recent','add.pin','my.pins']).controller('AppController', ['$scope', '$router', 'user', 'auth', '$location', AppController]);

app.factory('authInterceptor', authInterceptor)
.service('user', userService)
.service('auth', authService)
.service('imageService',imageService)
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});