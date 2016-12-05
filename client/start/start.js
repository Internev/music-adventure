// console.log("START MODULE HERE, HI!")
angular.module('start', [])

.controller('StartCtrl', function($http) {

  this.data = [1, 2, 3, 4, 5];

  this.getData = function(name){
    $http({
        method: 'GET',
        url: '/lastfm',
        params: {name: name}
    })
    .then((resp) => {
      console.log(resp);
      this.data = resp.data;
    });
  }

});
