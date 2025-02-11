import os
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import openai
import io
from pydub import AudioSegment

app = Flask(__name__)

socketio = SocketIO(app)

openai.api_key = os.environ.get("OPENAI_API_KEY")

transcribed_text = ""

@socketio.on('audio_chunk')

def voice_to_text(audio_chunk):

    global transcribed_text 

    try:
        audio_segment = AudioSegment.from_file(io.BytesIO(audio_chunk)) # chunk is processed in real-time

        audio_buffer = io.BytesIO() # to hold audio data
        audio_segment.export(audio_buffer, format="mp3") # as whisper uses .mp3 format
        audio_buffer.seek(0) # buffer pointer is reset to beginning

        transcript = openai.Audio.transcribe("whisper-1", audio_buffer)
        chunk_text = transcript["text"]

        transcribed_text += chunk_text 

        emit('transcription', {'text': chunk_text}, broadcast=True)  # emit trancribed text in real-time

    except Exception as e:

        print(f"Error: {e}")
        emit('transcription_error', {'error': str(e)}, broadcast=True)  # Notify client of errors

@app.route('/')

def index():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app, debug=True)