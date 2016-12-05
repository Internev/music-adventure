var express = require('express');
var request = require('request');

var app = express();

app.get('/', (req, res)=>{
  console.log(req);
  res.send('Server is alive!');
});


app.listen(8000);
console.log('Shard listening on 127:8k');
