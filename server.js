#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('assignment 2:server');
var express = require('express');
var router = express.Router();

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

app.listen(port, () => {
  debug('Listening on port ' + port);
  console.log(`Server running on port ${port}`);
});

/**
 * Event listener for HTTP server "error" event.
 */
app.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page',
  heading: 'Home'
 });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Me',
  heading: 'About'
 });
});

/* GET Projects page. */
router.get('/Projects', function(req, res, next) {
  res.render('index', { title: 'Projects',
  heading: 'Projects'
 });
});

/* GET Contact page. */
router.get('/Contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us',
  heading: 'Contact Us'
 });
});

module.exports = router;
