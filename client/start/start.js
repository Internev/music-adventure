
angular.module('start', ['youtube-embed', 'lastfm'])

.controller('StartCtrl', function($http, Lastfm) {

  this.artistData = {};
  this.relatedArtists = [];
  this.youtubeUrl;
  this.playerVars = {
    controls: 1,
    autoplay: 1
  }

  this.getData = function(name){
    Lastfm.getLastfmData(name)
      .then((resp) => {
        console.log(resp);
      });
  }

  // this.getData = function(name){
  //   $http({
  //       method: 'GET',
  //       url: '/lastfm',
  //       params: {name: name}
  //   })
  //   .then((resp) => {
  //     console.log(resp.data.youtube.items[0]);
  //     this.artistData = resp.data.lastfm.artist;
  //     this.relatedArtists = resp.data.lastfm.artist.similar.artist;
  //     this.youtubeUrl = resp.data.youtube.items[0].id.videoId;
  //     console.log(this.youtubeUrl);
  //   });
  // }

});
