import api from './api';

export const getElections = () => api.get('/elections');
export const createElection = (data) => api.post('/elections', data);
export const approveCandidate = (candidateId) => api.post(`/candidates/${candidateId}/approve`);
export const rejectCandidate = (candidateId) => api.post(`/candidates/${candidateId}/reject`);