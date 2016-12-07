
angular.module('start', ['youtube-embed', 'util'])

.controller('StartCtrl', function($http, Util, $scope, $rootScope) {

  this.type = 'artist'
  this.searchbox = '';
  this.artistData = {};
  this.relatedArtists = [];
  this.artistSongs = [];
  this.playList = [];
  this.youtubeUrl;
  this.playerVars = {
    controls: 0,
    autoplay: 1
  }
  this.hidden = true;

  this.getData = (name)=>{
    //reset in case we call again.
    this.artistData = {};
    this.relatedArtists = [];
    this.artistSongs = [];
    this.searchbox = '';

    if (this.type === 'genre'){
      this.getGenreData(name);
    } else {
      this.getArtistData(name);
    }
  };

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
      this.getArtistData(this.artistData.name);
    }
  });

//I have created promisecallbackhell?!?
  this.getArtistData = function(name){
    this.type = 'artist';

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
            this.playList = [];
            this.playList.push([resp.data.toptracks['@attr'].artist, resp.data.toptracks.track[track].name,
            resp.data.toptracks.track[track].image[0]['#text']]);
          })
          .then(()=>{
            var current = this.playList.shift();
            Util.getYoutubeData(current[0] + ' - ' + current[1])
            .then((resp) => {
              this.hidden = false;
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
      })
  }

  // Request tracks every 5 seconds so we don't flood API.
  setInterval(()=>{
    if (this.relatedArtists.length > 0){
      var artist = this.relatedArtists.shift();
      this.populatePlaylist(artist.name);
    }
  }, 5000);

  this.play = (player) => {
    player.playVideo();
  };

  this.pause = (player) => {
    player.pauseVideo();
  };

  this.stop = (player) => {
    player.stopVideo();
  };

  this.next = (player) => {
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
      this.getArtistData(this.artistData.name);
    }
  };

  this.getGenreData = (name) => {
    this.type = 'genre';

    Util.getLastfmGenre(name)
      .then((resp) => {
        this.relatedArtists = resp.data.topartists.artist;
        var track = Math.floor(Math.random() * this.relatedArtists.length);
        this.getArtistData(this.relatedArtists[track].name);
      });
  }





});
