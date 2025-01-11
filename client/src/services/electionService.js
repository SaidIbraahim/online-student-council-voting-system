import api from './api';

export const getElections = () => api.get('/elections');
export const castVote = (electionId, candidateId) => api.post(`/elections/${electionId}/vote`, { candidateId });