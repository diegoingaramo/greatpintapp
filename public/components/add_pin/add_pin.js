angular.module('add.pin', ['ngNewRouter'])
  .controller('AddPinController', ['$scope','$location','$routeParams','imageService','user', function ($scope, $location, $routeParams, imageService, user) {
      
    //Model Initialization
    $scope.pinImage = {}
    
    $scope.addPin = function(){
       imageService.save(user.currentUser(), $scope.pinImage).then(function(result) {
           if (result.data.success){
               $location.path('mypins').search({});
           }
            else
                bootbox.alert(result.data.message);
           }, function(reason) {
             bootbox.alert("Error: " + reason);
        });
    };
      
      
  }]);