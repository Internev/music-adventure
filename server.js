var express = require('express');
var request = require('request');
var rp = require('request-promise');
var keys = require('./config/hapi.js')

var app = express();

app.use(express.static('./client'));

app.get('/lastfm', (req, res)=>{

  rp('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + req.query.name + '&api_key=' + keys.LASTFM_API_KEY + '&limit=5&format=json')
    .then((data)=>{
      var dataz = JSON.parse(data).similarartists.artist;
      res.send(dataz);
    })
    .catch(err=>console.log(err));
});


app.listen(8000);
console.log('Shard listening on 127:8k');
