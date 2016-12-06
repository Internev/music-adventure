
angular.module('start', ['youtube-embed', 'util'])

.controller('StartCtrl', function($http, Util, $scope) {

  this.artistData = {};
  this.relatedArtists = [];
  this.artistSongs;
  this.playList = [];
  this.youtubeUrl;
  this.playerVars = {
    controls: 1,
    autoplay: 1
  }

  $scope.$on('youtube.player.ended', ($event, player)=>{
    var current;
    if (this.playList.length > 0){
      current = this.playList.shift()
      Util.getYoutubeData(current[0] + ' - ' + current[1])
      .then((resp) => {
        this.youtubeUrl = resp.data.items[0].id.videoId;
        player.playVideo();
      })
      .then(()=>{
        Util.getLastfmArtistData(current[0])
        .then((resp)=>{
          this.artistData = resp.data.artist;
        });
      });
    } else {
      this.getData(this.artistData.name);
    }
  });

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
            console.log('****\nSongData: ', resp);
            this.artistSongs = resp.data.toptracks.track;
            var track = Math.floor(Math.random() * this.artistSongs.length);
            this.playList.push([resp.data.toptracks['@attr'].artist, resp.data.toptracks.track[track].name,
            resp.data.toptracks.track[track].image[0]['#text']]);
          })
          .then(()=>{
            var current = this.playList.shift();
            Util.getYoutubeData(current[0] + ' - ' + current[1])
            .then((resp) => {
              console.log('youtube:', resp);
              this.youtubeUrl = resp.data.items[0].id.videoId;
            });
          })
      })
  }

  this.populatePlaylist = function(name){
    Util.getLastfmSongData(name)
      .then((resp) => {
        this.artistSongs = resp.data.toptracks.track;
        var track = Math.floor(Math.random() * this.artistSongs.length);
        this.playList.push([resp.data.toptracks['@attr'].artist, resp.data.toptracks.track[track].name,
        resp.data.toptracks.track[track].image[0]['#text']]);
        console.log('Playlist changed, now:', this.playList);
      })
  }

  // Request tracks every 5 seconds so we don't flood API.
  setInterval(()=>{
    if (this.relatedArtists.length > 0){
      var artist = this.relatedArtists.pop();
      console.log('about to populate playlist with:', artist.name);
      this.populatePlaylist(artist.name);
    }
  }, 5000);

});
