const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { auth } = require('../middleware/auth');

// POST /api/contact - submit a contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contact - get all contact messages
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts); // Always return an array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 