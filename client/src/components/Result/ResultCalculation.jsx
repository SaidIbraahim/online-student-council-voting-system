import React, { useEffect, useState } from 'react';
import { getResults } from '../../services/resultService';

const ResultCalculation = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await getResults();
      setResults(response.data);
    };
    fetchResults();
  }, []);

  return (
    <div className="result-calculation">
      <h2>Election Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.candidateId}>
            {result.candidateName}: {result.totalVotes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultCalculation;