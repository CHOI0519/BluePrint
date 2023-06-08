const express = require('express');
const path = require('path');
var fs = require('fs');
var http = require('http');

const mime = require('mime-types');
const e = require('express');
const app = express();
const port = 8080;



// app.set()

// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', 
//   "script-src 'self' 'unsafe-inline'http://dapi.kakao.com");
//   next();
// });

// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
// app.use(expressCspHeader({
//     directives: {
//         'script-src': [SELF, INLINE, "http://dapi.kakao.com"],
//     }
// }));


app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy',
  "script-src 'self' 'unsafe-inline'");
  next();
});

// app.use((req, res, next) => {
//  res.setHeader('Content-Security-Policy',
//  "script-src 'self' 'unsafe-inline' http://dapi.kakao.com ");
//   next();
// });

app.use('/node_modules', express.static(path.join(__dirname , '/node_modules')));

app.use(express.static('public')); 
app.use(express.static('views'));  

app.get('/public/stylesheet/Main.css', (req, res) => {
  res.set('Content-Type', mime.lookup('Main.css'));
  res.sendFile(__dirname + '/public/stylesheet/Main.css');
});

app.get('/', (req, res) => { 
  res.sendFile(__dirname +  '/views/MainPage.html');
  res.setHeader('Permissions-Policy', 'your-configured-features'); 
})

app.get('/views/MainPage.html', (req, res) => { 
  res.sendFile(__dirname +  '/views/MainPage.html');
})

app.get('/views/ListPage.html', (req, res) => { 
  res.sendFile(__dirname +  '/views/ListPage.html');
})

//   console.log('Recieved data:', req.body);

//   res.sendStatus(200);
// })

app.use('/public', express.static('public', { 
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

