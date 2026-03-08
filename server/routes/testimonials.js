const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// @route   GET /api/testimonials - Get approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/testimonials/all - Get all testimonials (admin)
router.get('/all', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });

  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/testimonials - Submit testimonial
router.post('/', [
  body('studentName', 'Name is required').notEmpty().trim().escape(),
  body('grade', 'Grade is required').notEmpty().trim().escape(),
  body('text', 'Testimonial text is required').notEmpty().trim().escape(),
  body('rating', 'Rating must be 1-5').isInt({ min: 1, max: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.json({ msg: 'Testimonial submitted for review' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/testimonials/:id/approve - Approve/reject testimonial (admin)
router.put('/:id/approve', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });

  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved: req.body.isApproved },
      { new: true }
    );
    if (!testimonial) return res.status(404).json({ msg: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/testimonials/:id - Delete testimonial (admin)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });

  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Testimonial removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
