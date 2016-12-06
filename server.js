var express = require('express');
var request = require('request');
var rp = require('request-promise');
var keys = require('./config/hapi.js')

var app = express();

app.use(express.static('./client'));

app.get('/lastfm', (req, res)=>{

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

  var youtubePlaylistReq = {
    uri: 'https://www.googleapis.com/youtube/v3/playlists',
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

  var lastfmReq = {
    uri: 'http://ws.audioscrobbler.com/2.0/',
    qs: {
      method: 'artist.getinfo',
      artist: req.query.name,
      api_key: keys.LASTFM_API_KEY,
      limit: 5,
      format: 'json'
    },
    headers: {
          'User-Agent': 'Request-Promise'
      }
  };

  var returnObj = {};

  rp(youtubeReq)
    .then((data)=>{
      console.log('youtube responded!', JSON.parse(data));
      returnObj.youtube = JSON.parse(data);
    })
    .then(
      rp(lastfmReq)
      .then((data)=>{
        returnObj.lastfm = JSON.parse(data);
        res.send(returnObj);
      })
    )
    .catch(err=>console.log(err));
});


app.listen(8000);
console.log('Shard listening on 127:8k');
