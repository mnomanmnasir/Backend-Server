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

// GET route to fetch all form submissions
router.get('/', async (req, res) => {
  try {
    // Fetch all form submissions from the database
    const forms = await Form.find();

    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// PUT route to update a form submission by ID
router.put('/:id', async (req, res) => {
  try {
    // Extract the ID parameter from the request URL
    const { id } = req.params;

    // Find the form submission by ID and update it with the new data
    const updatedForm = await Form.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedForm) {
      // If the form submission with the given ID doesn't exist
      return res.status(404).json({ message: 'Form submission not found' });
    }

    res.status(200).json({ message: 'Form submission updated successfully', updatedForm });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// DELETE route to delete a form submission by ID
router.delete('/:id', async (req, res) => {
  try {
    // Extract the ID parameter from the request URL
    const { id } = req.params;

    // Find the form submission by ID and delete it
    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      // If the form submission with the given ID doesn't exist
      return res.status(404).json({ message: 'Form submission not found' });
    }

    res.status(200).json({ message: 'Form submission deleted successfully', deletedForm });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
