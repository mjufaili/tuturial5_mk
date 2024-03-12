const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import the uuid module to generate unique IDs
const app = express();
app.use(express.json());

// Mock data: list of users
const users = [
  { email: "abc@abc.ca", firstName: "ABC", id: "5abf6783" },
  { email: "xyz@xyz.ca", firstName: "XYZ", id: "5abf674563" }
];

// Middleware for testing the app on root path
app.get('/', (req, res) => {
  res.json({ message: "Yes! It Works!" });
});

// GET route for /users
app.get('/users', (req, res) => {
  res.status(200).json({
    message: "Users retrieved",
    success: true,
    users
  });
});

// PUT route for /update/:id
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { email, firstName } = req.body;
  
    // Find the index of the user with the given id
    const userIndex = users.findIndex(user => user.id === id);
  
    // If no user is found, send a 404 response
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found", success: false });
    }
  
    // Update the user's email and/or firstName if provided in the body of the request
    if (email) users[userIndex].email = email;
    if (firstName) users[userIndex].firstName = firstName;
  
    // Send a success response
    res.json({ message: "User updated", success: true });
});

app.post('/add', (req, res) => {
    const { email, firstName } = req.body;
  
    // Validate the input
    if (!email || !firstName) {
      return res.status(400).json({ message: "Email and firstName are required", success: false });
    }
  
    // Create a new user object with a unique ID
    const newUser = {
      email,
      firstName,
      id: uuidv4() // Generate a unique ID for the user
    };
  
    // Add the new user to the array
    users.push(newUser);
  
    // Send a success response
    res.status(201).json({ message: "User added", success: true });
  });
  
// GET route for /user/:id to retrieve a single user by their ID
app.get('/user/:id', (req, res) => {
    const { id } = req.params; // Extract the id from the route parameters
  
    // Find the user with the given id
    const user = users.find(u => u.id === id);
  
    // If a user with the id exists, return the user object
    if (user) {
      res.json({
        success: true,
        user
      });
    } else {
      // If no user is found with the id, return a not found response
      res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
});


// Export the app for use by the server
module.exports = app;

