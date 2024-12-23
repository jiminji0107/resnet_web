import React, { useState } from 'react';
import './DropBox.css';

function DropBox() {
  const [prediction, setPrediction] = useState('');
  const [imageSrc, setImageSrc] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleDrop = async (event) => {
    event.preventDefault();
    setLoading(true);

    const file = event.dataTransfer.files[0];
    if (!file) {
      setPrediction('No file selected');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://resnet-back.onrender.com/predict', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.error) {
        setPrediction('Prediction failed');
        setImageSrc('');
      } else {
        setPrediction(data.class);
        setImageSrc(data.image_url); 
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      setPrediction('Error occurred while predicting');
      setImageSrc('');
    }

    setLoading(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="dropbox-container">
      <div
        className="dropbox"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {loading ? 'Loading...' : 'Drag & Drop an image here'}
      </div>
      {imageSrc && <img src={imageSrc} alt="Uploaded" className="preview" />} 
      {prediction && <div className="result">{prediction}</div>}
    </div>
  );
}

export default DropBox;
