const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const courses = [
  { name: 'Freelancing Road to 50K Per Month', description: 'Learn freelancing skills', price: 4999, affiliateCommission: 30 },
  { name: 'Marketing Mastery', description: 'Master digital marketing', price: 3999, affiliateCommission: 25 },
  { name: 'Personal Development', description: 'Improve your mindset', price: 2999, affiliateCommission: 20 },
];

const seedCourses = async () => {
  try {
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log('Courses seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding courses:', err);
    process.exit(1);
  }
};

seedCourses();