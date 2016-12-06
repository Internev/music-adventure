angular.module('lastfm', [])

.factory('Lastfm', ($http)=>{

  var getLastfmData = function(name){
    return $http({
        method: 'GET',
        url: '/lastfm',
        params: {name: name}
    });
  }




  return {
    getLastfmData: getLastfmData
  }

});
