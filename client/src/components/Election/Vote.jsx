import React, { useEffect, useState } from 'react';
import { getElections, castVote } from '../../services/electionService';

const Vote = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchElections = async () => {
      const response = await getElections();
      setElections(response.data);
    };
    fetchElections();
  }, []);

  const handleVote = async () => {
    try {
      await castVote(selectedElection.id, selectedCandidate.id);
      alert('Vote cast successfully!');
    } catch (error) {
      console.error('Failed to cast vote:', error);
    }
  };

  return (
    <div className="vote">
      <h2>Vote</h2>
      <div>
        <h3>Available Elections</h3>
        <ul>
          {elections.map((election) => (
            <li key={election.id} onClick={() => setSelectedElection(election)}>
              {election.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedElection && (
        <div>
          <h3>Candidates</h3>
          <ul>
            {selectedElection.candidates.map((candidate) => (
              <li key={candidate.id} onClick={() => setSelectedCandidate(candidate)}>
                {candidate.name}
              </li>
            ))}
          </ul>
          <button onClick={handleVote}>Vote</button>
        </div>
      )}
    </div>
  );
};

export default Vote;