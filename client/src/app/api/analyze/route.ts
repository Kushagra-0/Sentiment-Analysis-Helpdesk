import { NextResponse } from 'next/server';
import SentimentResultModel from '@/model/SentimentResult';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: Request) {
  await dbConnect();

  const { transcription, sentiment, userId, feedbackRating } = await request.json();

  try {
    const newSentimentResult = new SentimentResultModel({
      transcription,
      sentiment,
      userId,
      feedbackRating
    });

    await newSentimentResult.save();
    return NextResponse.json({ message: 'Sentiment result saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving sentiment result:', error);
    return NextResponse.json({ error: 'Failed to save sentiment result' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const results = await SentimentResultModel.find({});
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Error fetching sentiment results:', error);
    return NextResponse.json({ error: 'Failed to fetch sentiment results' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  await dbConnect();

  const { id, feedbackRating } = await request.json();

  try {
    const result = await SentimentResultModel.findByIdAndUpdate(
      id,
      { feedbackRating },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: 'Sentiment result not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Feedback updated successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error updating feedback rating:', error);
    return NextResponse.json({ error: 'Failed to update feedback rating' }, { status: 500 });
  }
}