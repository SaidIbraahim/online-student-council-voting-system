import api from './api';

export const getResults = () => api.get('/results');
export const generateReport = (electionId) => api.get(`/results/report/${electionId}`, { responseType: 'blob' });