import React, { useState, useEffect } from 'react';

function ProfileForm({ initialData }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    current_role: '',
    skills: '',
    qualification: '',
    preferred_city: '',
    experience_level: ''
  });

  // Auto-fill when CV data is received
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save updated data to database
    console.log('Saving profile:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div>
        <label>Full Name</label>
        <input 
          type="text" 
          name="full_name" 
          value={formData.full_name} 
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Phone</label>
        <input 
          type="tel" 
          name="phone_number" 
          value={formData.phone_number} 
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Current Role</label>
        <input 
          type="text" 
          name="current_role" 
          value={formData.current_role} 
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Skills (comma-separated)</label>
        <textarea 
          name="skills" 
          value={formData.skills} 
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Education/Qualification</label>
        <input 
          type="text" 
          name="qualification" 
          value={formData.qualification} 
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Preferred City</label>
        <input 
          type="text" 
          name="preferred_city" 
          value={formData.preferred_city} 
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Experience Level</label>
        <select 
          name="experience_level" 
          value={formData.experience_level} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>
      </div>

      <button type="submit">Save Profile</button>
    </form>
  );
}

export default ProfileForm;