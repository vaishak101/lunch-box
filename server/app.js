const express = require('express');
const app = express();
app.use(express.json());


//Common Route
// GET Menu
app.get('/api/lunchbox/v1/menu', (req, res) => {
  res.status(200).json({ status: 200, message: "Sends Menu" })
})
//Get Orders Data acc to User
app.get('/api/lunchbox/v1/orders/:id', (req, res) => {
  res.status(200).json({ status: 200, message: "Get User Specific Orders" })
})


//USER ROUTES
//Add Order
app.post('/api/lunchbox/v1/orders', (req, res) => {
  res.status(201).json({ status: 201, message: "Add New Order" })
})

//Add Contact Message
app.post('/api/lunchbox/v1/contact', (req, res) => {
  res.status(201).json({ status: 201, message: "Add Contact Message" })
})

// Add User
app.post('/api/lunchbox/v1/users', (req, res) => {
  res.status(201).json({ status: 201, message: "Add New User" })
})
// User Login
app.get('/api/lunchbox/v1/users/:id', (req, res) => {
  res.status(200).json({ status: 200, message: "User Login" })
})
// Update User
app.patch('/api/lunchbox/v1/users/:id', (req, res) => {
  res.status(201).json({ status: 201, message: "Update User Detail" })
})
// Delete User
app.delete('/api/lunchbox/v1/users/:id', (req, res) => {
  res.status(201).json({ status: 201, message: "Delete User" })
})


// ADMIN ROUTES

//Add new item to Menu
app.post('/api/lunchbox/v1/menu', (req, res) => {
  res.status(201).json({ status: 201, message: "Add New Item to Menu" })
})
//Update Menu Item
app.patch('/api/lunchbox/v1/menu/:id', (req, res) => {
  res.status(201).json({ status: 201, message: "Update Item in Menu" })
})
//Delete Menu Item
app.delete('/api/lunchbox/v1/menu/:id', (req, res) => {
  res.status(201).json({ status: 201, message: "Delete Item from Menu" })
})

//Get Contact messages
app.get('/api/lunchbox/v1/contact', (req, res) => {
  res.status(200).json({ status: 200, message: "Sends All Contact messages" })
})
//Delete Message
app.delete('/api/lunchbox/v1/contact/:id', (req, res) => {
  res.status(201).json({ status: 201, message: "Delete Message" })
})

// Get User Details
app.get('/api/lunchbox/v1/users', (req, res) => {
  res.status(200).json({ status: 200, message: "Sends User List" })
})

//Get All Orders
app.get('/api/lunchbox/v1/orders', (req, res) => {
  res.status(200).json({ status: 200, message: "Get All Orders" })
})


// Add Admin
app.post('/api/lunchbox/v1/admin', (req, res) => {
  res.status(201).json({ status: 201, message: "Add New Admin Here" })
})
// Admin Login
app.get('/api/lunchbox/v1/admin/:id', (req, res) => {
  res.status(200).json({ status: 200, message: "Admin Login" })
})
// Update User Detail
app.patch('/api/lunchbox/v1/admin/:id', (req, res) => {
  res.status(201).json({ status: 201, message: "Update Admin Detail" })
})
// Delete User
app.delete('/api/lunchbox/v1/admin/:id', (req, res) => {
  res.status(201).json({ status: 201, message: "Delete Admin" })
})

module.exports = app