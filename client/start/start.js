// console.log("START MODULE HERE, HI!")
angular.module('start', [])

.controller('StartCtrl', function($http) {

  this.artistData = {};

  this.getData = function(name){
    $http({
        method: 'GET',
        url: '/lastfm',
        params: {name: name}
    })
    .then((resp) => {
      console.log(resp.data);
      this.artistData = resp.data;

    });
  }

});
