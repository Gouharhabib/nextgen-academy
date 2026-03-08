const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  grade: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
