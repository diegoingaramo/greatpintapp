angular.module('recent', ['ngNewRouter'])
  .controller('RecentController', ['$scope','$location','$routeParams','imageService','$rootScope', function ($scope,$location, $routeParams, imageService,$rootScope) {
      
    $scope.init = function(){
        $scope.bricks = [];
        imageService.recent().then(function(result) {
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
      
      $scope.profile_pins = function(id){
          $location.path('profile_pins').search({id: id});
      }
      
     $scope.init();
      
  }]);