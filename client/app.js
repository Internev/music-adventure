angular.module('adventure', [
    'ngRoute',
    'start'
  ])
  .config(($httpProvider, $routeProvider)=>{

    $routeProvider
      .when('/', {
        templateUrl: './start/start.html',
        controller: 'StartCtrl',
        controllerAs: 'start'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
