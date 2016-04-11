angular.module('profile.pins', ['ngNewRouter'])
  .controller('ProfilePinsController', ['$scope','$location','$routeParams','imageService','user', function ($scope,$location, $routeParams, imageService, user) {
      
    $scope.init = function(){
        $scope.userProfile = {_id: $location.search().id};
        console.log($location);
        $location.$$search = {};
        $scope.bricks = [];
        user.search($scope.userProfile).then(function(result) {
           if (result.data.success){
                   $scope.userProfile = result.data.user;
           }
            else
                bootbox.alert(result.data.message);
           }, function(reason) {
             bootbox.alert("Error: " + reason);
        });
        imageService.searchByUser($scope.userProfile).then(function(result) {
           if (result.data.success){
               result.data.images.forEach(function(image){
                   $scope.bricks.push(image);
               });
           }
            else
                bootbox.alert(result.data.message);
           }, function(reason) {
             bootbox.alert("Error: " + reason);
        });
        
    };
      
    $scope.init();
      
      
  }]);