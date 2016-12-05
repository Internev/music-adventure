angular.module('adventure', [
    'ngRoute',
    'ui.router',
    'start'
  ])
  .config(function($httpProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'start/start.html',
        controller: 'StartCtrl',
        controllerAs: 'start'
      })
  });
