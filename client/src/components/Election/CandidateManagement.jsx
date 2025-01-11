import React, { useEffect, useState } from 'react';
import { getCandidates, approveCandidate, rejectCandidate } from '../../services/superAdminService';

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await getCandidates();
      setCandidates(response.data);
    };
    fetchCandidates();
  }, []);

  const handleApprove = async (candidateId) => {
    try {
      await approveCandidate(candidateId);
      alert('Candidate approved successfully!');
    } catch (error) {
      console.error('Failed to approve candidate:', error);
    }
  };

  const handleReject = async (candidateId) => {
    try {
      await rejectCandidate(candidateId);
      alert('Candidate rejected successfully!');
    } catch (error) {
      console.error('Failed to reject candidate:', error);
    }
  };

  return (
    <div className="candidate-management">
      <h2>Manage Candidates</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name}
            <button onClick={() => handleApprove(candidate.id)}>Approve</button>
            <button onClick={() => handleReject(candidate.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateManagement;