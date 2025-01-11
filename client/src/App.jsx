// App.jsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import './styles/tailwind.css';

const App = () => (
  <AuthProvider>
    <Layout />
  </AuthProvider>
);

export default App;

