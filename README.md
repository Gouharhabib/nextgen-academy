# NextGen Academy - MERN Stack Website

A full-fledged tuition class management website built with MongoDB, Express.js, React.js, and Node.js.

## Features

### Public Pages
- **Home** - Hero section, features, popular courses, testimonials, CTA
- **Courses** - Browse all courses with subject filtering
- **About** - Academy info, stats, teaching approach
- **Contact** - Contact form with office details
- **Enrollment** - Student enrollment form for courses

### Authentication
- Student registration & login
- JWT-based authentication
- Role-based access (Admin/Student)

### Admin Dashboard
- **Overview** - Stats, recent enrollments
- **Course Management** - Add, edit, delete courses
- **Enrollment Management** - Approve/reject student enrollments
- **Contact Messages** - View & manage contact submissions
- **Testimonials** - Approve/reject student testimonials

## Tech Stack
- **Frontend:** React 18, React Router, Axios, React Icons, React Toastify
- **Backend:** Node.js, Express.js, JWT, bcryptjs
- **Database:** MongoDB with Mongoose ODM

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation

1. Install all dependencies:
   ```bash
   npm run install-all
   ```

2. Create a `.env` file in the root (already provided with defaults):
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/nextgen_academy
   JWT_SECRET=your_secret_key_here
   ```

3. Seed the database with sample data:
   ```bash
   node server/seed.js
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

   This starts both the backend (port 5000) and frontend (port 3000).

### Admin Login
- **Email:** admin@nextgenacademy.com
- **Password:** admin123

## Project Structure

```
├── server/
│   ├── index.js          # Express server entry point
│   ├── seed.js           # Database seeder
│   ├── middleware/
│   │   └── auth.js       # JWT authentication middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Contact.js
│   │   └── Testimonial.js
│   └── routes/
│       ├── auth.js
│       ├── courses.js
│       ├── enrollments.js
│       ├── contacts.js
│       ├── testimonials.js
│       └── dashboard.js
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       ├── index.css
│       ├── context/
│       │   └── AuthContext.js
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   ├── ProtectedRoute.js
│       │   └── AdminSidebar.js
│       └── pages/
│           ├── Home.js
│           ├── Courses.js
│           ├── About.js
│           ├── Contact.js
│           ├── Enroll.js
│           ├── Login.js
│           ├── Register.js
│           └── admin/
│               ├── Dashboard.js
│               ├── AdminCourses.js
│               ├── AdminEnrollments.js
│               ├── AdminContacts.js
│               └── AdminTestimonials.js
├── .env
├── .gitignore
└── package.json
```
