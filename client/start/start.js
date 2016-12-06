
angular.module('start', ['youtube-embed', 'util'])

.controller('StartCtrl', function($http, Util) {

  this.artistData = {};
  this.relatedArtists = [];
  this.artistSongs;
  this.playList = [];
  this.youtubeUrl;
  this.playerVars = {
    controls: 1,
    autoplay: 1
  }

//I have created promisecallbackhell?!?
  this.getData = function(name){
    Util.getLastfmArtistData(name)
      .then((resp) => {
        this.artistData = resp.data.artist;
        this.relatedArtists = resp.data.artist.similar.artist;
      })
      .then(()=>{
        Util.getLastfmSongData(name)
          .then((resp) => {
            this.artistSongs = resp.data.toptracks.track;
            var track = Math.floor(Math.random() * this.artistSongs.length);
            this.playList.push(name + '-' + resp.data.toptracks.track[track].name);
            console.log(this.playList);
          })
          .then(()=>{
            Util.getYoutubeData(this.playList.pop())
            .then((resp) => {
              console.log('youtube:', resp);
              this.youtubeUrl = resp.data.items[0].id.videoId
            });
          })
      })
      .then(this.populatePlaylist);
  }


  this.populatePlaylist = function(){
    
  }

});
