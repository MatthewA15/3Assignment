const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  name: String,
  category: String,
  size: String,
  color: String,
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ClothingItem', clothingItemSchema);
