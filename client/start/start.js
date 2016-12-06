
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
});
