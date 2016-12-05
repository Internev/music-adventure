var express = require('express');
var request = require('request');
var rp = require('request-promise');
var keys = require('./config/hapi.js')

var app = express();

app.use(express.static('./client'));

app.get('/lastfm', (req, res)=>{

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

// Get artist info (bio, similar artists) from last.fm
//'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + req.query.name + '&api_key=' + keys.LASTFM_API_KEY + '&limit=5&format=json'

  rp(lastfmReq)
    .then((data)=>{
      res.send(JSON.parse(data));
    })
    .catch(err=>console.log(err));
});


app.listen(8000);
console.log('Shard listening on 127:8k');
