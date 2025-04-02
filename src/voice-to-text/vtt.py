"""
SOCKET IO Starter code from :
https://python-socketio.readthedocs.io/en/stable/
https://python-socketio.readthedocs.io/en/stable/intro.html#client-examples
"""

"""
Author: Gurleen Rahi, reviewed by Pranav Kalsi
Last Updated: April 7th
Purpose: This allows us to perform audio transcription base d on the sound bytes from the frontend
"""

import os
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import openai
import io
from pydub import AudioSegment
from dotenv import load_dotenv

app = Flask(__name__)

CORS(app)  # Enable CORS
socketio = SocketIO(app, cors_allowed_origins="*")

load_dotenv("../.env")

openai.api_key = os.environ.get("OPENAI_API_KEY")

transcribed_text = ""

"""
This method transcribes the audio chunks
"""
@socketio.on("audio_chunk")
def voice_to_text(audio_chunk):
    transcribed_text = ""
    try:
        audio_segment = AudioSegment.from_file(
            io.BytesIO(audio_chunk), format="webm", codec="libopus"
        )

        audio_buffer = io.BytesIO()  # to hold audio data
        audio_segment.export(audio_buffer, format="mp3")  # as whisper uses .mp3 format
        audio_buffer.seek(0)  # buffer pointer is reset to beginning

        audio_buffer.name = "audio.mp3"

        transcript = openai.Audio.transcribe("whisper-1", audio_buffer)

        chunk_text = transcript["text"]

        transcribed_text += chunk_text

        print(transcribed_text)

        emit(
            "transcription", {"text": chunk_text}, broadcast=True
        )  # emit trancribed text in real-time

    except Exception as e:

        print(f"Error: {e}")
        emit(
            "transcription_error", {"error": str(e)}, broadcast=True
        )  # Notify client of errors


if __name__ == "__main__":
    socketio.run(app)
