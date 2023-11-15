var express = require('express');
var router = express.Router();
const ClothingItem = require('../models/ClothingItem');


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


// Example route for adding a new clothing item
router.post('/add-clothing', async (req, res) => {
  try {
    const newItem = new ClothingItem({
      name: req.body.name,
      category: req.body.category,
      size: req.body.size,
      color: req.body.color,
      // purchaseDate will be set to default
    });

    await newItem.save();
    res.redirect('/some-page');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving the clothing item');
  }
});


module.exports = router;
