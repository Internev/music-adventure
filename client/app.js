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
      // .when('/play', {
      //   templateUrl: './play/play.html',
      //   controller: 'PlayCtrl',
      //   controllerAs: 'play'
      // })
      .otherwise({
        redirectTo: '/'
      });
  });
