var express = require('express');
var request = require('request');
var rp = require('request-promise');
var keys = require('./config/hapi.js')

var app = express();

app.use(express.static('./client'));

app.get('/lastfm', (req, res)=>{

  rp('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + req.query.name + '&api_key=' + keys.LASTFM_API_KEY + '&limit=5&format=json')
    .then((data)=>{
      //console.log(JSON.stringify(data, null, 4));
      res.send(JSON.parse(data));
    })
    .catch(err=>console.log(err));
});


app.listen(8000);
console.log('Shard listening on 127:8k');
