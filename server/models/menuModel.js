const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
    required: [true, "Menu Item must have a name"]
  },
  desc: {
    type: String,
    required: [true, "Menu Item must have a desc"]
  },
  category: {
    type: String,
    required: [true, "Menu Item must have a category"],
    enum: ['rice', 'bread', 'maincourse', 'starter', 'desert']
  },
  price: {
    type: Number,
    required: [true, "Menu Item must have a price"]
  },
  veg: {
    type: Boolean,
    required: [true, "Menu Item define if its VEG or not"]
  }
})

const Menu = mongoose.model('Menu', menuSchema, 'menu');
module.exports = Menu