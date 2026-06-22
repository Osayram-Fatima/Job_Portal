import React, { useState } from 'react';
import axios from 'axios';

function CVUpload({ onProfileUpdate }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CV file');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('cv', file);
    formData.append('user_id', 1); // Get from auth context

    try {
      const response = await axios.post('http://localhost:5000/api/cv/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setExtractedData(response.data.data);
        onProfileUpdate(response.data.data); // Pass data to parent
        alert('CV uploaded and parsed successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload CV: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-upload">
      <h3>Upload Your CV</h3>
      <input 
        type="file" 
        accept=".pdf,.docx" 
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Processing...' : 'Upload CV'}
      </button>

      {extractedData && (
        <div className="extracted-preview">
          <h4>Extracted Information:</h4>
          <p><strong>Name:</strong> {extractedData.full_name}</p>
          <p><strong>Email:</strong> {extractedData.email}</p>
          <p><strong>Phone:</strong> {extractedData.phone_number}</p>
          <p><strong>Skills:</strong> {extractedData.skills}</p>
        </div>
      )}
    </div>
  );
}

export default CVUpload;