var express = require('express');
var router = express.Router();
const ClothingItem = require('../models/ClothingItem'); // ClothingItem model

// POST route clothnig (Create operation)
router.post('/add-clothing', async (req, res, next) => {
  try {
    // Creating a new ClothingItem
    const newItem = new ClothingItem({
      name: req.body.name,
      category: req.body.category,
      size: req.body.size,
      color: req.body.color,
    });

    // Saving the new item to the database
    await newItem.save();
    // Redirect to the clothing list
    res.redirect('/clothing-items/view-clothing');
  } catch (error) {
    // Handling errors and sending an error message
    console.error(error);
    res.status(500).send('Error adding the clothing item: ' + error.message);
  }
});

// GET route for displaying clothing items (Read operation)
router.get('/view-clothing', async (req, res) => {
  try {
    // Retrieving all clothing items from the database
    const items = await ClothingItem.find();
    // Rendering the clothing list view 
    res.render('clothingListView', { items, title: 'Clothing Items' });
  } catch (error) {
    // Handle errors and sending an error message
    console.error(error);
    res.status(500).send('Error retrieving clothing items: ' + error.message);
  }
});
// GET route for showing the add clothing item form
router.get('/add-clothing', (req, res, next) => {
  // Render new clothing item
  res.render('addClothingView', { title: 'Add New Clothing Item' });
});

// GET route for showing the edit form
router.get('/edit-clothing/:id', async (req, res) => {
  try {
    // Finding a specific clothing item by its ID
    const item = await ClothingItem.findById(req.params.id);
    // Rendering the edit view
    res.render('editClothingView', { item, title: 'Edit Clothing Item' });
  } catch (error) {
    // Handle errors and sending an error message
    console.error(error);
    res.status(500).send('Error finding the item: ' + error.message);
  }
});
// POST route for updating a clothing item
router.post('/edit-clothing/:id', async (req, res) => {
  try {
    // Update the database with new data
    await ClothingItem.findByIdAndUpdate(req.params.id, req.body);
    // Redirect to clothing list page upon successful update
    res.redirect('/clothing-items/view-clothing');
  } catch (error) {
    // Handle error message
    console.error(error);
    res.status(500).send('Error updating the item: ' + error.message);
  }
});

// POST route of a clothing item
router.delete('/delete-clothing/:id', function(req, res) {
  const id = req.params.id; // Extracting the item ID from the URL
  ClothingItem.findByIdAndDelete(id)
    .then(() => {
      // Handle successful deletion
      res.redirect('/clothing-items/view-clothing'); // Redirecting after deletion
    })
    .catch(err => {
      // Handle errors during deletion
      console.error('Error deleting the item:', err);
      res.status(500).send('Error deleting the item');
    });
});
// POST route of a clothing item
router.post('/update-clothing/:id', async (req, res) => {
  try {
      const id = req.params.id; // Extract the item ID
      const updatedData = {
          // Extracting data
          name: req.body.name,
          category: req.body.category,
          size: req.body.size,
          color: req.body.color
      };
      // Updating the database with the new data
      await ClothingItem.findByIdAndUpdate(id, updatedData, { new: true });
      // Redirect to the /view-clothing
      res.redirect('/clothing-items/view-clothing');
  } catch (error) {
      // Handle errors
      console.error('Error updating the item:', error);
      res.status(500).send('Error updating the item');
  }
});

module.exports = router;
