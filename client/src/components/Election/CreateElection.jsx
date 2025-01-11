import React, { useState } from 'react';
import { createElection } from '../../services/superAdminService';

const CreateElection = () => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createElection(formData);
      alert('Election created successfully!');
    } catch (error) {
      console.error('Failed to create election:', error);
    }
  };

  return (
    <div className="create-election">
      <h2>Create Election</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Election Name" onChange={handleChange} />
        <input type="date" name="startDate" onChange={handleChange} />
        <input type="date" name="endDate" onChange={handleChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateElection;