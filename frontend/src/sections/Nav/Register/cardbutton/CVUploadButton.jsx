import React, { useState } from 'react';
import axios from 'axios';

function CVUploadButton() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Jab user CV select kare
  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
    setMessage(''); // Clear previous message
  };

  // Jab user Upload button press kare
  const handleUpload = async () => {
    if (!file) {
      alert('Pehle CV select karo!');
      return;
    }

    setLoading(true);
    setMessage('');

    // FormData banao (file bhejne ke liye)
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('user_id', '1'); // Baad mein JWT se lenge

    try {
      // Backend ko bhejo
      const response = await axios.post('http://localhost:5000/api/cv/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Success!
      if (response.data.success) {
        setMessage('✅ CV upload ho gayi! Profile auto-fill ho gaya!');
        console.log('Extracted Data:', response.data.data);
        
        // Yahan tumhara form auto-fill ho jayega
        // response.data.data mein sab kuch hai
      }

    } catch (error) {
      console.error('Upload error:', error);
      setMessage('❌ Error: ' + (error.response?.data?.message || 'Upload failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>📄 Upload Your CV (Auto-fill Profile)</h3>
      
      {/* File Select Button */}
      <input 
        type="file" 
        accept=".pdf,.docx" 
        onChange={handleFileSelect}
        style={{ marginRight: '10px' }}
      />
      
      {/* Upload Button */}
      <button 
        onClick={handleUpload} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Uploading...' : 'Upload CV'}
      </button>

      {/* Message Display */}
      {message && (
        <p style={{ 
          marginTop: '10px', 
          color: message.includes('✅') ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default CVUploadButton;