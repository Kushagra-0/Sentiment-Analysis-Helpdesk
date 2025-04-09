'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/common/navbar';

const HistoryPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sentimentResults, setSentimentResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchSentimentResults = async () => {
      try {
        const response = await axios.get(`/api/analyze`);
        setSentimentResults(response.data);
      } catch (error) {
        console.error('Error fetching sentiment results:', error);
        setError('Failed to fetch sentiment results');
      }
    };

    fetchSentimentResults();
  }, []);

  const handleRateClick = (id: string) => {
    setSelectedResultId(id);
    setShowModal(true);
    setRating(0);
  };

  const handleRatingSubmit = async () => {
    if (!selectedResultId || rating === 0) return;

    try {
      await axios.patch('/api/analyze', {
        id: selectedResultId,
        feedbackRating: rating,
      });

      // Update UI after rating
      setSentimentResults((prev) =>
        prev.map((item) =>
          item._id === selectedResultId ? { ...item, feedbackRating: rating } : item
        )
      );
    } catch (error) {
      console.error('Failed to submit feedback rating:', error);
    }

    setShowModal(false);
    setSelectedResultId(null);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 px-4 md:px-8 lg:px-32 py-8">
        <div className="w-full md:w-3/4 xl:w-2/3 p-8 rounded-3xl bg-white border-2 border-black shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-black text-black">Sentiment Analysis History</h1>
            {error && <div className="text-red-500">{error}</div>}
            <p className="text-lg text-gray-700 my-8 font-medium">
              Review your past call analyses and insights.
            </p>
          </div>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-black">Transcription</th>
                <th className="border border-gray-300 p-2 text-black">Label</th>
                <th className="border border-gray-300 p-2 text-black">Score</th>
                <th className="border border-gray-300 p-2 text-black">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {sentimentResults.length > 0 ? (
                sentimentResults.map((result) => (
                  <tr key={result._id} className="hover:bg-blue-50">
                    <td className="border border-gray-300 p-2 text-black">{result.transcription}</td>
                    <td className="border border-gray-300 p-2 text-black">{result.sentiment.label}</td>
                    <td className="border border-gray-300 p-2 text-black">{result.sentiment.score.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2 text-black text-center">
                      {result.feedbackRating !== -1 ? (
                        <span>{result.feedbackRating}/5</span>
                      ) : (
                        <button
                          onClick={() => handleRateClick(result._id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Rate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border border-gray-300 p-2 text-center text-black">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-1/2 h-1/2 text-center items-center flex flex-col justify-between">
            <h2 className="text-2xl font-bold my-4">Rate the Accuracy</h2>
            <div className="flex justify-center mb-4 space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className={`w-16 h-16 rounded-full border text-black font-bold ${
                    rating === num ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-black">
                Cancel
              </button>
              <button
                onClick={handleRatingSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded my-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryPage;
