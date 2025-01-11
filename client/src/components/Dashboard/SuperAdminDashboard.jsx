import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getElections, createElection, approveCandidate, rejectCandidate } from '../../services/superAdminService';
import useAuth from '../../hooks/useAuth';

const SuperAdminDashboard = () => {
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    candidateSubmissionDeadline: '',
  });
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const electionsResponse = await getElections();
        setElections(electionsResponse.data);
        // Assuming you have a separate endpoint for fetching candidates
        // const candidatesResponse = await getCandidates();
        // setCandidates(candidatesResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createElection(formData);
      alert('Election created successfully!');
      // Refresh elections list
      const electionsResponse = await getElections();
      setElections(electionsResponse.data);
      // Clear form
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
        candidateSubmissionDeadline: '',
      });
    } catch (error) {
      console.error('Failed to create election:', error);
      alert('Failed to create election. Please try again.');
    }
  };

  const handleApprove = async (candidateId) => {
    try {
      await approveCandidate(candidateId);
      alert('Candidate approved successfully!');
      // Refresh candidates list
      // const candidatesResponse = await getCandidates();
      // setCandidates(candidatesResponse.data);
    } catch (error) {
      console.error('Failed to approve candidate:', error);
      alert('Failed to approve candidate. Please try again.');
    }
  };

  const handleReject = async (candidateId) => {
    try {
      await rejectCandidate(candidateId);
      alert('Candidate rejected successfully!');
      // Refresh candidates list
      // const candidatesResponse = await getCandidates();
      // setCandidates(candidatesResponse.data);
    } catch (error) {
      console.error('Failed to reject candidate:', error);
      alert('Failed to reject candidate. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-navy">Super Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Election</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Election Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="candidateSubmissionDeadline" className="block text-sm font-medium text-gray-700">Candidate Submission Deadline</label>
              <input
                type="date"
                id="candidateSubmissionDeadline"
                name="candidateSubmissionDeadline"
                value={formData.candidateSubmissionDeadline}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Election
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Manage Elections</h2>
          {elections.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {elections.map((election) => (
                <li key={election._id} className="py-4">
                  <p className="text-lg font-medium">{election.name}</p>
                  <p className="text-sm text-gray-500">Start: {new Date(election.startDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">End: {new Date(election.endDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Status: {election.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No elections created yet.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Manage Candidates</h2>
          {candidates.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <li key={candidate._id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium">{candidate.fullName}</p>
                    <p className="text-sm text-gray-500">{candidate.faculty}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleApprove(candidate._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(candidate._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No candidates to manage.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

