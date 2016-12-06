
angular.module('start', ['youtube-embed', 'util'])

.controller('StartCtrl', function($http, Util) {

  this.artistData = {};
  this.relatedArtists = [];
  this.youtubeUrl;
  this.playerVars = {
    controls: 1,
    autoplay: 1
  }

  this.getData = function(name){
    Util.getLastfmData(name)
      .then((resp) => {
        console.log('lastfm', resp.data);
        this.artistData = resp.data.artist;
        this.relatedArtists = resp.data.artist.similar.artist;
      });

    Util.getYoutubeData(name)
      .then((resp) => {
        console.log('youtube:', resp);
        this.youtubeUrl = resp.data.items[0].id.videoId
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
