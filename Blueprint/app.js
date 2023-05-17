// const path = require('path');

const express = require('express');

const mime = require('mime-types');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
  next();
});

app.use(express.static('public'));

app.get('/public/Main.css', (req, res) => {
  res.set('Content-Type', mime.lookup('Main.css'));
  res.sendFile(__dirname + '/public/Main.css');
});


app.get('/', (req, res) => { 
  res.sendFile(__dirname + '/public/MainPage.html');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




