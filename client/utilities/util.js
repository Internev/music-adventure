angular.module('util', [])

.factory('Util', ($http, $location)=>{

  var getLastfmArtistData = function(name){
    return $http({
        method: 'GET',
        url: '/lastfmartist',
        params: {name: name}
    });
  }

  var getLastfmSongData = function(name){
    return $http({
        method: 'GET',
        url: '/lastfmsong',
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

  var makeYoutubePL = function(){
    return $http({
      method: 'GET',
      url: '/youtubePL'
    });
  }

  var getLastfmGenre = function(name){
    return $http({
      method: 'GET',
      url: '/lastfmgenre',
      params: {name: name}
    })
  }

  return {
    getLastfmArtistData: getLastfmArtistData,
    getYoutubeData: getYoutubeData,
    makeYoutubePL: makeYoutubePL,
    getLastfmSongData: getLastfmSongData,
    getLastfmGenre: getLastfmGenre
  }

});
