const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const applicationRoutes = require('./app/routes/applicationRoutes');
const instrumentRoutes = require('./app/routes/instrumentRoutes');
const eventRoutes = require('./app/routes/eventRoutes');
const teacherRoutes = require('./app/routes/teacherRoutes');
const authRoutes = require('./app/routes/authRoutes');
const categoryRoutes = require('./app/routes/categoryRoutes');
const stockRoutes = require('./app/routes/stockRoutes');
const studentRoutes = require('./app/routes/studentRoutes');
const rentalRoutes = require('./app/routes/rentalRoutes');
const userRoutes = require('./app/routes/userRoutes');
const teacherSkillRoutes = require('./app/routes/teacherSkillRoutes');
const lessonRoutes = require('./app/routes/lessonRoutes');
const messageRoutes = require('./app/routes/messageRoutes');
const errorMiddleware = require('./app/middleware/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/applications', applicationRoutes);
app.use('/api/instruments', instrumentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teacher-skills', teacherSkillRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/messages', messageRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});