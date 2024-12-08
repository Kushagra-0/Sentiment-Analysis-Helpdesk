interface SentimentResult {
    transcription: string;
    sentiment: {
      label: string;
      score: number;
    };
  }

export default SentimentResult;