import express from 'express';
import { createElection, getElections, castVote } from '../controllers/electionController.js';
import { protect, superAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new election (Super Admin only)
router.post('/create', protect, superAdmin, createElection);

// Fetch all elections
router.get('/', getElections);

// Cast a vote for a specific election
router.post('/:electionId/vote', protect, castVote);

export default router;