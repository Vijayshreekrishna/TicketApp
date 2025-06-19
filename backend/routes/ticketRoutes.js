const express = require('express');

const router = express.Router();
const Ticket = require('../models/ticket.js');

// Fetch all the tickets
router.get('/ticket', async (req, res) => {
  try {
    const { search, status, priority } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { createdBy: new RegExp(search, 'i') },
      ];
    }
    if (status && status !== 'All') {
      query.status = status;
    }
    if (priority && priority !== 'All') {
      query.priority = priority;
    }
    const tickets = await Ticket.find(query);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "ERROR! SOMETHING WENT WRONG" });
  }
});

router.post('/ticket', async (req, res) => {
  const ticket = new Ticket({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.body.createdBy,
    status: 'Open',
    priority: req.body.priority || 'Low',
  });

  try {
    const newTicket = await ticket.save();
    res.json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/ticket/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/ticket/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    await ticket.deleteOne();
    res.json({ message: "Ticket deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;