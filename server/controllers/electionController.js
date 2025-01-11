import Election from '../models/electionModel.js';

// Create a new election (Super Admin only)
export const createElection = async (req, res) => {
  const { name, startDate, endDate, candidateSubmissionDeadline } = req.body;

  try {
    const newElection = new Election({
      name,
      startDate,
      endDate,
      candidateSubmissionDeadline,
      status: new Date() < new Date(startDate) ? 'upcoming' : 'ongoing'
    });

    await newElection.save();
    res.status(201).json({ message: 'Election created successfully', election: newElection });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create election', error: error.message });
  }
};

// Fetch all elections
export const getElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.status(200).json(elections);
  } catch (error) {
    console.error('Error fetching elections:', error);
    res.status(500).json({ message: 'Failed to fetch elections' });
  }
};

// Cast a vote for a specific election
export const castVote = async (req, res) => {
  const { electionId } = req.params;
  const { candidateId } = req.body;

  try {
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    // Logic to cast a vote for the candidate
    // ...

    res.status(200).json({ message: 'Vote cast successfully' });
  } catch (error) {
    console.error('Error casting vote:', error);
    res.status(500).json({ message: 'Failed to cast vote' });
  }
};