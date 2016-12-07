var express = require('express');
var request = require('request');
var rp = require('request-promise');
var keys = require('./config/hapi.js')

var app = express();

app.use(express.static('./client'));

app.get('/lastfmartist', (req, res) => {

  var lastfmReq = {
    uri: 'http://ws.audioscrobbler.com/2.0/',
    qs: {
      method: 'artist.getinfo',
      artist: req.query.name,
      api_key: keys.LASTFM_API_KEY,
      format: 'json'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    }
  };

  rp(lastfmReq)
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(err => console.log(err));
});

app.get('/lastfmsong', (req, res) => {

  var lastfmReq = {
    uri: 'http://ws.audioscrobbler.com/2.0/',
    qs: {
      method: 'artist.getTopTracks',
      artist: req.query.name,
      api_key: keys.LASTFM_API_KEY,
      limit: 15,
      format: 'json'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    }
  };

  rp(lastfmReq)
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(err => console.log(err));
});

app.get('/youtube', (req, res) => {

  var youtubeReq = {
    uri: 'https://www.googleapis.com/youtube/v3/search',
    qs: {
      key: keys.YOUTUBE_API_KEY,
      maxResults: 1,
      embeddable: true,
      part: 'snippet',
      type: 'video',
      q: req.query.name
    },
    headers: {
      'User-Agent': 'Request-Promise'
    }
  }

  rp(youtubeReq)
    .then((data) => {
      //console.log('youtube responded!', JSON.parse(data));
      res.send(JSON.parse(data))
    })
    .catch(err => console.log(err));

});

app.get('/youtubePL', (req, res) => {
  // var youtubePlaylistReq = {
  //   method: 'POST',
  //   uri: 'https://www.googleapis.com/youtube/v3/playlists',
  //   qs: {
  //     key: keys.YOUTUBE_API_KEY,
  //     part: 'snippet',
  //     fields: 'id',
  //   },
  //   body: {
  //     snippet: {
  //       title: 'MAPL',
  //       description: 'Music Adventure Playlist',
  //     },
  //   },
  //   headers: {
  //         'User-Agent': 'Request-Promise'
  //     }
  // }
  //
  var options = {
    uri: 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&fields=id&key=' + keys.YOUTUBE_CLIENT_ID,
    headers: keys.YOUTUBE_OAUTH,
    body: {
        snippet: {
          title: 'test',
          description: 'testy',
        },
    },
    json: true,
  };

  rp.post(options)
    .then((data) => {
      console.log('******\n\nyoutubePL responded!\n\n******', data);
    })
    .catch(err=>console.error(err));

});

app.get('/lastfmgenre', (req, res) => {
  var lastfmReq = {
    uri: 'http://ws.audioscrobbler.com/2.0/',
    qs: {
      method: 'tag.gettopartists',
      tag: req.query.name,
      api_key: keys.LASTFM_API_KEY,
      format: 'json'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    }
  };

  rp(lastfmReq)
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(err => console.log(err));

});

app.listen(8000);
console.log('Shard listening on 127:8k');
