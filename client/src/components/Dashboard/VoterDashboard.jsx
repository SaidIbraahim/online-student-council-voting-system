import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getElections, castVote } from '../../services/electionService';
import useAuth from '../../hooks/useAuth';

const VoterDashboard = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { user } = useAuth();
  const { electionId } = useParams();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await getElections();
        setElections(response.data);
        if (electionId) {
          const election = response.data.find(e => e.id === electionId);
          setSelectedElection(election);
        }
      } catch (error) {
        console.error('Failed to fetch elections:', error);
      }
    };
    fetchElections();
  }, [electionId]);

  const handleVote = async () => {
    if (!selectedElection || !selectedCandidate) return;
    try {
      await castVote(selectedElection.id, selectedCandidate.id);
      alert('Vote cast successfully!');
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Failed to cast vote:', error);
      alert('Failed to cast vote. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-navy mb-6">
        Welcome, {user.name}
      </h1>
      
      {!selectedElection ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Available Elections</h2>
          {elections.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {elections.map((election) => (
                <div 
                  key={election.id}
                  className="border rounded-lg p-4 cursor-pointer hover:border-primary-blue transition-colors"
                  onClick={() => setSelectedElection(election)}
                >
                  <h3 className="font-medium text-lg">{election.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">Click to view candidates and vote</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No elections are currently available.</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedElection.name}</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Candidates</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedElection.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedCandidate?.id === candidate.id 
                      ? 'border-primary-blue bg-blue-50' 
                      : 'hover:border-primary-blue'
                  }`}
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <h4 className="font-medium">{candidate.name}</h4>
                  <p className="text-sm text-gray-600 mt-2">{candidate.position}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleVote}
            disabled={!selectedCandidate}
            className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cast Vote
          </button>
        </div>
      )}
    </div>
  );
};

export default VoterDashboard;

