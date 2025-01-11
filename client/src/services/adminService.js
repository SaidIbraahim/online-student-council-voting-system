import api from './api';

export const getCandidates = () => api.get('/candidates');
export const registerCandidate = (formData) => api.post('/candidates', formData);