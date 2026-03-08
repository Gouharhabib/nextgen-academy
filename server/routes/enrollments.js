const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// @route   POST /api/enrollments - Submit enrollment
router.post('/', [
  body('studentName', 'Student name is required').notEmpty().trim().escape(),
  body('email', 'Valid email is required').isEmail().normalizeEmail(),
  body('phone', 'Phone is required').notEmpty().trim().escape(),
  body('parentName', 'Parent name is required').notEmpty().trim().escape(),
  body('parentPhone', 'Parent phone is required').notEmpty().trim().escape(),
  body('grade', 'Grade is required').notEmpty().trim().escape(),
  body('course', 'Course is required').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const course = await Course.findById(req.body.course);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    if (course.enrolledCount >= course.maxStudents) {
      return res.status(400).json({ msg: 'Course is full' });
    }

    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.json({ msg: 'Enrollment submitted successfully', enrollment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/enrollments - Get all enrollments (admin)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });

  try {
    const enrollments = await Enrollment.find().populate('course', 'title subject').sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/enrollments/:id/status - Update enrollment status (admin)
router.put('/:id/status', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });

  const { status } = req.body;
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ msg: 'Enrollment not found' });

    const previousStatus = enrollment.status;
    enrollment.status = status;
    await enrollment.save();

    // Update enrolled count
    if (status === 'approved' && previousStatus !== 'approved') {
      await Course.findByIdAndUpdate(enrollment.course, { $inc: { enrolledCount: 1 } });
    } else if (previousStatus === 'approved' && status !== 'approved') {
      await Course.findByIdAndUpdate(enrollment.course, { $inc: { enrolledCount: -1 } });
    }

    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
