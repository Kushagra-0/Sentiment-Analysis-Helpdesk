'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import SentimentResult from '@/interface/SentimentResult';
import { useSession } from 'next-auth/react';

export default function SentimentAnalysisForm() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // modal state

  const { data: session } = useSession();
  const userId = session?.user?._id;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

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
    formData.append('userId', userId);

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/analyze-call', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      setResult(response.data);
      setShowModal(true); // show modal after analysis

      await axios.post('/api/analyze', {
        transcription: response.data.transcription,
        sentiment: response.data.sentiment,
        userId: userId,
        feedbackRating: -1,
      });
    } catch (error) {
      console.error('Error analyzing call:', error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.error || 'Server responded with an error');
        } else if (error.request) {
          setError('No response received from server. Please check your connection.');
        } else {
          setError('Error setting up the request: ' + error.message);
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-start justify-center">
        <div className="font-black text-text w-full">
          <label className="mb-2 block">Upload WAV Audio File</label>
          <input
            type="file"
            accept=".wav,audio/wav,audio/x-wav,audio/wave"
            onChange={handleFileChange}
            className="mt-2 w-full px-4 py-2 text-text font-black border border-gray-400 rounded-2xl"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!audioFile || isLoading}
          className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 hover:bg-black hover:text-white font-bold rounded-2xl flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze Call'
          )}
        </button>

        {error && (
          <div className="w-full p-4 bg-red-100 text-red-800 rounded-2xl">
            {error}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-1/2 h-1/2 relative shadow-xl flex flex-col items-center justify-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="font-bold text-2xl mb-4 text-gray-900">Analysis Result</h2>
            <p className="text-gray-700 mb-2">
              <strong>Transcription:</strong> {result.transcription}
            </p>
            <p className="text-gray-700">
              <strong>Sentiment:</strong> {result.sentiment.label} (Score: {result.sentiment.score.toFixed(2)})
            </p>
          </div>
        </div>
      )}
    </>
  );
}
