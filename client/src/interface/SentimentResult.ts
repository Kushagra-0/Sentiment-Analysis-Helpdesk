interface SentimentResult {
    transcription: string;
    sentiment: {
      label: string;
      score: number;
    };
    userId: string;
    feedbackRating: number;
  }

export default SentimentResult;