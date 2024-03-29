const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// POST route to submit form data
router.post('/', async (req, res) => {
  try {
    // Create a new form submission document
    const formData = new Form(req.body);

    // Save the form data to the database
    await formData.save();

    res.status(201).json({ message: 'Form submitted successfully', status: 'true' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
