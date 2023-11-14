var express = require('express');
var router = express.Router();
const ClothingItem = require('../models/ClothingItem');

// POST route for adding a new clothing item (Create)
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
    res.redirect('/some-success-page'); // Redirect to a success page or home page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving the clothing item');
  }
});

// GET route for displaying clothing items (Read)
router.get('/view-clothing', async (req, res) => {
  try {
    const items = await ClothingItem.find();
    res.render('clothingListView', { items }); // Render a view with the items
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving clothing items');
  }
});

// GET route for showing the edit form (Update - Part 1)
router.get('/edit-clothing/:id', async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.id);
    res.render('editClothingView', { item }); // Render a view with the item data for editing
  } catch (error) {
    console.error(error);
    res.status(500).send('Error finding the item');
  }
});

// POST route for updating a clothing item (Update - Part 2)
router.post('/edit-clothing/:id', async (req, res) => {
  try {
    await ClothingItem.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/some-success-page'); // Redirect after successful update
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating the item');
  }
});

// POST route for deleting a clothing item (Delete)
router.post('/delete-clothing/:id', async (req, res) => {
  try {
    await ClothingItem.findByIdAndRemove(req.params.id);
    res.redirect('/some-success-page'); // Redirect after successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting the item');
  }
});

module.exports = router;
