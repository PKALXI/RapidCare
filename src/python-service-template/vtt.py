import os
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import openai
import io
from pydub import AudioSegment

app = Flask(__name__)

CORS(app) #Enable CORS
socketio = SocketIO(app, cors_allowed_origins="*")

# openai.api_key = os.environ.get("OPENAI_API_KEY")
os.environ['OPENAI_API_KEY'] = "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"

transcribed_text = ""

@socketio.on('audio_chunk')
def voice_to_text(audio_chunk):
    print('HIT-------------------------------')
    transcribed_text = ''
    
    try:
        audio_segment = AudioSegment.from_file(io.BytesIO(audio_chunk), format="webm", codec="libopus")

        audio_buffer = io.BytesIO() # to hold audio data
        audio_segment.export(audio_buffer, format="mp3") # as whisper uses .mp3 format
        audio_buffer.seek(0) # buffer pointer is reset to beginning
        
        audio_buffer.name = "audio.mp3"
        
        transcript = openai.Audio.transcribe("whisper-1", audio_buffer)
        
        chunk_text = transcript["text"]

        transcribed_text += chunk_text 

        print(transcribed_text)

        emit('transcription', {'text': chunk_text}, broadcast=True)  # emit trancribed text in real-time

    except Exception as e:

        print(f"Error: {e}")
        emit('transcription_error', {'error': str(e)}, broadcast=True)  # Notify client of errors


if __name__ == '__main__':
    socketio.run(app, debug=True)