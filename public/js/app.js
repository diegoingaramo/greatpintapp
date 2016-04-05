/* Main controller definition */

AppController.$routeConfig = [
];

function AppController($scope, $router, $location) {
    
    
};

/* End main controller definition */

var app = angular.module('appMain', ['ngNewRouter']).controller('AppController', ['$scope', '$router', '$location', AppController]);