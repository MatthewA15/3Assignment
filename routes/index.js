var express = require('express');
var router = express.Router();

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
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects',
  heading: 'Projects'
 });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us',
  heading: 'Contact Us'
 });
});

module.exports = router;
