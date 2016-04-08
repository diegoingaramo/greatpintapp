app.directive('customnavbar', function() {
    
    var controller = ['$scope', function ($scope) {
        
        //Model Initialization
        $scope.showSignin = 0;
        $scope.notFoundUser = false;
        $scope.userAlreadyExist = false;
        
        $scope.toggleSignin = function(){
           $scope.showSignin = ($scope.showSignin == 0)?1:0;  
        };
    
        
    }];
    
    return {
        restrict : 'E',
        templateUrl: 'js/directives/navbar/navbar.html',
        controller: controller
    }
});