app.directive('customnavbar', function() {
    
    var controller = ['$scope','user','auth','$location', function ($scope,user,auth,$location) {
        
        //Model Initialization
        $scope.showSignin = 0;
        $scope.notFoundUser = false;
        $scope.userAlreadyExist = false;
        $scope.errorMessage = "";
        $scope.user = {};
        
        $scope.toggleSignin = function(){
           $scope.showSignin = ($scope.showSignin == 0)?1:0;  
        };
        
        $scope.login = function() {
            $scope.notFoundUser = false;
            $scope.errorMessage = "";
            user.login($scope.user.username, $scope.user.password).then(function(result) {
               if (result.data.success){
                   $location.path('/');
               }
                else{
                    $scope.notFoundUser = true;
                    $scope.errorMessage = result.data.message;
                }
               }, function(reason) {
                 bootbox.alert("Error: " + reason);
            });
        };
        
        
        $scope.tLogin = function() {
            user.tLogin().then(function(result) {
               if (result.data.success){
                   $location.path('/');
               }
            }, function(reason) {
                 bootbox.alert("Error: " + reason);
            });
        };
        
        $scope.signup = function() {
           $scope.userAlreadyExist = false;
           $scope.errorMessage = "";
           user.signup($scope.user.newUsername, $scope.user.newPassword, $scope.user.newRPassword).then(function(result) {
                if (result.data.success){
                    $location.path('/');
                }
                else{
                     $scope.userAlreadyExist = true;
                     $scope.errorMessage = result.data.message;
                }
           }, function(reason) {
                bootbox.alert("Error: " + reason);
           });
        };
        
        
        $scope.logout = function() {
            auth.logout && auth.logout();
            $location.path('/');
        };

    
        
    }];
    
    return {
        restrict : 'E',
        templateUrl: 'js/directives/navbar/navbar.html',
        controller: controller
    }
});