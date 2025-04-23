require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'hod', 'faculty'],
    required: [true, 'Role is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const users = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
  },
  {
    email: 'hod@example.com',
    password: 'hod123',
    role: 'hod',
    name: 'HOD User',
  },
  {
    email: 'faculty@example.com',
    password: 'faculty123',
    role: 'faculty',
    name: 'Faculty User',
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Drop the collection to remove all indexes
    await mongoose.connection.collection('users').drop().catch(() => {
      console.log('Collection does not exist, skipping drop');
    });
    console.log('Cleared existing users');

    // Insert new users
    await User.insertMany(users);
    console.log('Users seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers(); 