angular.module('my.pins', ['ngNewRouter'])
  .controller('MyPinsController', ['$scope','$location','$routeParams','imageService','user', function ($scope,$location, $routeParams, imageService, user) {
      
    $scope.init = function(){
        $scope.bricks = [];
        imageService.searchByUser(user.currentUser()).then(function(result) {
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
      
    $scope.deleteImage = function(image,index){
        imageService.delete(image).then(function(result) {
           if (result.data.success){
              $scope.bricks.splice(index,1);
           }
            else
                bootbox.alert(result.data.message);
           }, function(reason) {
             bootbox.alert("Error: " + reason);
        });
    }
    
    $scope.init();
      
      
  }]);