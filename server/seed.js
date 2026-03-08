const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const User = require('./models/User');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create admin user if not exists
    const existingAdmin = await User.findOne({ email: 'admin@nextgenacademy.com' });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Admin',
        email: 'admin@nextgenacademy.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin user created: admin@nextgenacademy.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    // Seed sample courses
    const Course = require('./models/Course');
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany([
        {
          title: 'Mathematics Mastery',
          description: 'Comprehensive mathematics course covering algebra, geometry, trigonometry, and calculus. Build strong foundations and excel in exams with our expert-led program.',
          subject: 'Mathematics',
          grade: 'Grade 9-10',
          teacher: 'Dr. Sharma',
          duration: '6 months',
          schedule: 'Mon, Wed, Fri - 4:00 PM to 5:30 PM',
          fee: 3000,
          maxStudents: 25,
        },
        {
          title: 'Science Explorer',
          description: 'In-depth science course covering Physics, Chemistry, and Biology with practical experiments and conceptual learning. Perfect for board exam preparation.',
          subject: 'Science',
          grade: 'Grade 9-10',
          teacher: 'Prof. Verma',
          duration: '6 months',
          schedule: 'Tue, Thu, Sat - 4:00 PM to 5:30 PM',
          fee: 3500,
          maxStudents: 25,
        },
        {
          title: 'English Excellence',
          description: 'Improve your English language skills including grammar, writing, reading comprehension, and literature analysis. Boost your confidence in communication.',
          subject: 'English',
          grade: 'Grade 6-8',
          teacher: 'Ms. Priya',
          duration: '4 months',
          schedule: 'Mon, Wed - 3:00 PM to 4:30 PM',
          fee: 2000,
          maxStudents: 20,
        },
        {
          title: 'Physics Foundation',
          description: 'Master the fundamentals of Physics with hands-on experiments and numerical problem solving. Designed for students aiming for competitive exams.',
          subject: 'Physics',
          grade: 'Grade 11-12',
          teacher: 'Dr. Kapoor',
          duration: '8 months',
          schedule: 'Mon, Wed, Fri - 6:00 PM to 7:30 PM',
          fee: 4000,
          maxStudents: 20,
        },
        {
          title: 'Chemistry Pro',
          description: 'From organic to inorganic chemistry, master all concepts with real-world applications. Includes lab sessions and exam strategies.',
          subject: 'Chemistry',
          grade: 'Grade 11-12',
          teacher: 'Dr. Patel',
          duration: '8 months',
          schedule: 'Tue, Thu, Sat - 6:00 PM to 7:30 PM',
          fee: 4000,
          maxStudents: 20,
        },
        {
          title: 'Junior Math Fun',
          description: 'Make mathematics fun and engaging for young learners. Interactive teaching methods with puzzles, games, and practical examples.',
          subject: 'Mathematics',
          grade: 'Grade 3-5',
          teacher: 'Mrs. Gupta',
          duration: '4 months',
          schedule: 'Tue, Thu - 3:00 PM to 4:00 PM',
          fee: 1500,
          maxStudents: 15,
        },
      ]);
      console.log('Sample courses created');
    }

    // Seed sample testimonials
    const Testimonial = require('./models/Testimonial');
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany([
        {
          studentName: 'Rahul Mehta',
          grade: 'Grade 10',
          text: 'NextGen Academy helped me score 95% in my board exams. The teachers are amazing and the study material is top-notch!',
          rating: 5,
          isApproved: true,
        },
        {
          studentName: 'Priya Singh',
          grade: 'Grade 12',
          text: 'The Physics and Chemistry classes prepared me well for competitive exams. I cleared JEE Mains with a great score thanks to the guidance here.',
          rating: 5,
          isApproved: true,
        },
        {
          studentName: 'Ankit Kumar',
          grade: 'Grade 8',
          text: 'I used to be afraid of Mathematics, but the teachers here made it so easy and fun. My grades improved from C to A+ in just 3 months!',
          rating: 5,
          isApproved: true,
        },
      ]);
      console.log('Sample testimonials created');
    }

    await mongoose.disconnect();
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
