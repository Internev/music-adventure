angular.module('util', [])

.factory('Util', ($http, $location)=>{

  var getLastfmData = function(name){
    return $http({
        method: 'GET',
        url: '/lastfm',
        params: {name: name}
    });
  }

  var getYoutubeData = function(name){
    return $http({
        method: 'GET',
        url: '/youtube',
        params: {name: name}
    });
  }

  return {
    getLastfmData: getLastfmData,
    getYoutubeData: getYoutubeData
  }

});
