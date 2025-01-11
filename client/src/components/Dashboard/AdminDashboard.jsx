import React, { useEffect, useState } from 'react';
import { getCandidates, registerCandidate } from '../../services/adminService';
import useAuth from '../../hooks/useAuth';

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    faculty: '',
    details: '',
    manifesto: '',
    candidateImage: null,
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getCandidates();
        setCandidates(response.data);
      } catch (error) {
        console.error('Failed to fetch candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, candidateImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await registerCandidate(formDataToSend);
      alert('Candidate registered successfully!');
      // Refresh the candidates list
      const response = await getCandidates();
      setCandidates(response.data);
      // Clear the form
      setFormData({
        fullName: '',
        faculty: '',
        details: '',
        manifesto: '',
        candidateImage: null,
      });
    } catch (error) {
      console.error('Failed to register candidate:', error);
      alert('Failed to register candidate. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-primary-navy mb-6">
        Welcome, {user.name}
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Register Candidate</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">Faculty</label>
              <input
                type="text"
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="manifesto" className="block text-sm font-medium text-gray-700">Manifesto</label>
              <textarea
                id="manifesto"
                name="manifesto"
                value={formData.manifesto}
                onChange={handleChange}
                rows="5"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="candidateImage" className="block text-sm font-medium text-gray-700">Candidate Image</label>
              <input
                type="file"
                id="candidateImage"
                name="candidateImage"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register Candidate
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Registered Candidates</h2>
          {candidates.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <li key={candidate._id} className="py-4 flex items-start">
                  {candidate.candidateImage && (
                    <img src={candidate.candidateImage} alt={candidate.fullName} className="h-16 w-16 rounded-full mr-3 object-cover" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{candidate.fullName}</p>
                    <p className="text-sm text-gray-500">{candidate.faculty}</p>
                    <p className="text-sm text-gray-500">Status: {candidate.approvalStatus}</p>
                    <p className="text-sm text-gray-500 mt-1">{candidate.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No candidates registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

