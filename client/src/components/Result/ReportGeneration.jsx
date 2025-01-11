import React, { useEffect, useState } from 'react';
import { generateReport } from '../../services/resultService';

const ReportGeneration = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);

  useEffect(() => {
    const fetchElections = async () => {
      const response = await getElections();
      setElections(response.data);
    };
    fetchElections();
  }, []);

  const handleGenerateReport = async () => {
    try {
      const report = await generateReport(selectedElection.id);
      const url = window.URL.createObjectURL(new Blob([report.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${selectedElection.name}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  return (
    <div className="report-generation">
      <h2>Generate Report</h2>
      <div>
        <h3>Select Election</h3>
        <ul>
          {elections.map((election) => (
            <li key={election.id} onClick={() => setSelectedElection(election)}>
              {election.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedElection && (
        <button onClick={handleGenerateReport}>Generate Report</button>
      )}
    </div>
  );
};

export default ReportGeneration;