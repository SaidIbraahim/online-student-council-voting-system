import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import electionRoutes from './routes/electionRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import voteRoutes from './routes/voteRoutes.js';
import userRoutes from './routes/userRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import passwordResetRoutes from './routes/passwordResetRoutes.js';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for simplicity; adjust for production as needed
  },
});

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true // Allow cookies to be sent with requests
}));

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/password-reset', passwordResetRoutes);

// Pass `io` to your result routes
app.use('/api/results', (req, res, next) => {
  console.log(`API hit: ${req.method} ${req.originalUrl}`);
  req.io = io;
  next();
}, resultRoutes);

// Socket.IO setup for real-time result updates
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for result update events from the server-side logic
  socket.on('newVote', (data) => {
    // Broadcast the new vote or result update to all connected clients
    io.emit('liveResults', data);
    console.log('Live result update broadcasted:', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));