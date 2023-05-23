const express = require('express');
var fs = require('fs');
var http = require('http');

const mime = require('mime-types');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
  next();
});

app.use(express.static('public'));

app.get('/public/stylesheet/Main.css', (req, res) => {
  res.set('Content-Type', mime.lookup('Main.css'));
  res.sendFile(__dirname + '/public/stylesheet/Main.css');
});

app.get('/', (req, res) => { 
  res.sendFile(__dirname +  '/public/views/MainPage.html');
})

app.get('/public/ListPage.html', (req, res) => { 
  res.sendFile(__dirname +  '/public/views/ListPage.html');
})

app.get('/kakao-maps-api', (req, res) => {
  res.sendFile(__dirname + '/public/kakao.js');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



