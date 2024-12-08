import os
import logging
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import torch
from transformers import pipeline
import tempfile

# Configure logging
logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s - %(levelname)s - %(message)s',
                    handlers=[
                        logging.FileHandler('app_debug.log'),
                        logging.StreamHandler()
                    ])

app = Flask(__name__)
CORS(app, resources={r"/analyze-call": {"origins": "http://localhost:3000"}})

# Load models with error handling
try:
    # Use CPU explicitly to avoid FP16 warnings
    device = torch.device('cpu')
    whisper_model = whisper.load_model("base", device=device)
    sentiment_analyzer = pipeline("sentiment-analysis")
    logging.info("Models loaded successfully")
except Exception as e:
    logging.error(f"Error loading models: {e}")
    logging.error(traceback.format_exc())

@app.route('/analyze-call', methods=['POST'])
def analyze_call():
    try:
        # Detailed logging for request
        logging.info("Received analyze-call request")
        logging.info(f"Request files: {request.files}")

        if 'audio' not in request.files:
            logging.error("No audio file in request")
            return jsonify({"error": "No audio file uploaded"}), 400
        
        audio_file = request.files['audio']
        logging.info(f"Audio file received: {audio_file.filename}")
        
        # Use tempfile to create a cross-platform temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
            audio_file.save(temp_file.name)
            temp_file_path = temp_file.name
        
        logging.info(f"Saved temporary file: {temp_file_path}")

        # Transcribe audio
        try:
            transcription_result = whisper_model.transcribe(temp_file_path)
            transcribed_text = transcription_result['text']
            logging.info(f"Transcription successful: {transcribed_text}")
        except Exception as transcribe_error:
            logging.error(f"Transcription error: {transcribe_error}")
            logging.error(traceback.format_exc())
            os.unlink(temp_file_path)
            return jsonify({"error": f"Transcription failed: {str(transcribe_error)}"}), 500
        
        # Perform sentiment analysis
        try:
            sentiment_result = sentiment_analyzer(transcribed_text)[0]
            logging.info(f"Sentiment analysis result: {sentiment_result}")
        except Exception as sentiment_error:
            logging.error(f"Sentiment analysis error: {sentiment_error}")
            logging.error(traceback.format_exc())
            os.unlink(temp_file_path)
            return jsonify({"error": f"Sentiment analysis failed: {str(sentiment_error)}"}), 500
        
        # Remove temporary file
        os.unlink(temp_file_path)
        
        return jsonify({
            "transcription": transcribed_text,
            "sentiment": {
                "label": sentiment_result['label'],
                "score": sentiment_result['score']
            }
        })
    
    except Exception as e:
        logging.error(f"Unexpected error in analyze_call: {e}")
        logging.error(traceback.format_exc())
        return jsonify({"error": f"Unexpected server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)