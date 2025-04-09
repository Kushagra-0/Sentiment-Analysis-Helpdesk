import mongoose, { Schema } from "mongoose";
import SentimentResult from "@/interface/SentimentResult";

const SentimentResultSchema: Schema<SentimentResult> = new mongoose.Schema<SentimentResult>({
  transcription: {
    type: String,
    required: [true, "Transcription is required"],
  },
  sentiment: {
    label: {
      type: String,
      required: [true, "Sentiment label is required"],
    },
    score: {
      type: Number,
      required: [true, "Sentiment score is required"],
    },
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  feedbackRating: {
    type: Number,
    default: -1,
  },
}, {timestamps: true});

const SentimentResultModel =
  (mongoose.models.SentimentResult as mongoose.Model<SentimentResult>) ||
  mongoose.model<SentimentResult>("SentimentResult", SentimentResultSchema);

export default SentimentResultModel;