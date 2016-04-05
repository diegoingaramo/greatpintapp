/* Main controller definition */

AppController.$routeConfig = [
    { path: '/recent', component: 'recent', as:'recent' },
];

function AppController($scope, $router, $location) {
    
    
};

/* End main controller definition */

var app = angular.module('appMain', ['ngNewRouter','recent']).controller('AppController', ['$scope', '$router', '$location', AppController]);