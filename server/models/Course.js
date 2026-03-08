const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  teacher: { type: String, required: true },
  duration: { type: String, required: true },
  schedule: { type: String, required: true },
  fee: { type: Number, required: true },
  maxStudents: { type: Number, default: 30 },
  enrolledCount: { type: Number, default: 0 },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
