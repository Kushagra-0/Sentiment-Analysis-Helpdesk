"use client"

import React, { useState } from 'react';
import axios from 'axios';
import SentimentResult from '@/interface/SentimentResult';

export default function SentimentAnalysis() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Validate file type and size
      const validTypes = ['audio/wav', 'audio/x-wav', 'audio/wave'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        setError('Please upload a WAV audio file.');
        return;
      }

      if (file.size > maxSize) {
        setError('File is too large. Maximum size is 10MB.');
        return;
      }

      setAudioFile(file);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) {
      setError('Please select a WAV audio file');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/analyze-call', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 seconds timeout
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing call:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response.data.error || 'Server responded with an error');
        } else if (error.request) {
          // The request was made but no response was received
          setError('No response received from server. Please check your connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          setError('Error setting up the request: ' + error.message);
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Helpdesk Call Sentiment Analysis</h1>
      
      <input 
        type="file" 
        accept=".wav,audio/wav,audio/x-wav,audio/wave" 
        onChange={handleFileChange}
        className="mb-4"
      />
      
      <button 
        onClick={handleSubmit} 
        disabled={!audioFile || isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Call'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold">Result:</h2>
          <p><strong>Transcription:</strong> {result.transcription}</p>
          <p><strong>Sentiment:</strong> {result.sentiment.label} (Score: {result.sentiment.score.toFixed(2)})</p>
        </div>
      )}
    </div>
  );
}