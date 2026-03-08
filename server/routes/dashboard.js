const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Contact = require('../models/Contact');
const User = require('../models/User');

// @route   GET /api/dashboard/stats - Get dashboard stats (admin)
router.get('/stats', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });

  try {
    const [totalCourses, totalEnrollments, pendingEnrollments, totalContacts, unreadContacts, totalStudents] = await Promise.all([
      Course.countDocuments({ isActive: true }),
      Enrollment.countDocuments(),
      Enrollment.countDocuments({ status: 'pending' }),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      User.countDocuments({ role: 'student' }),
    ]);

    const recentEnrollments = await Enrollment.find()
      .populate('course', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalCourses,
      totalEnrollments,
      pendingEnrollments,
      totalContacts,
      unreadContacts,
      totalStudents,
      recentEnrollments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
