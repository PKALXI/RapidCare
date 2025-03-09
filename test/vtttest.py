import pytest
from flask import Flask
import io
from unittest.mock import patch
from flask_socketio import SocketIO
from pydub import AudioSegment

app = Flask(__name__)
socketio = SocketIO(app)

# Mock audio chunk processing
@socketio.on('audio_chunk')

def handle_audio_chunk(data):

    if not data or not isinstance(data, bytes):  
        socketio.emit('error', {'message': 'File/data format is invalid'})  # invalid input
        return  

    transcription_result = {"text": "This is a test transcription."} # Mock result
    
    socketio.emit('transcription', transcription_result)  
    
    socketio.emit('confirmation', {'message': 'Transcription successful!'})  

@pytest.fixture
def client():

    app.config['TESTING'] = True
    client = socketio.test_client(app)
    yield client

@patch('openai.Audio.transcribe')  # Mock OpenAI API call

@pytest.mark.parametrize("audio_input, expected_event, expected_message", [
    ("recording.wav", "confirmation", "Transcription successful!"), 
    (b"", "error", "File/data format is invalid"),
    (12345, "error", "File/data format is invalid"), 
    ("invalid.mp4", "error", "File/data format is invalid")
])

def test_audio_transcription(mock_transcribe, client, audio_input, expected_event, expected_message):

    print(f"Test Input: {audio_input}")

    # If input is a valid WAV file
    if isinstance(audio_input, str) and audio_input.endswith(".wav"):
        audio = AudioSegment.from_wav(audio_input)
        audio_chunk = io.BytesIO()
        audio.export(audio_chunk, format="wav")
        audio_chunk.seek(0)
        audio_input = audio_chunk.read()

    client.emit('audio_chunk', audio_input)

    received = client.get_received()

    transcribed_text = None
    found_message = None

    # Validatation
    for event in received:
        if event['name'] == 'transcription':
            transcribed_text = event['args'][0]['text']
        if event['name'] == expected_event:
            found_message = event['args'][0]['message'] if 'message' in event['args'][0] else event['args'][0]['text']
            
            if expected_event == "confirmation":
                print(f"Confirmation: {found_message}")
                if transcribed_text:
                    print(f"Transcribed Text: {transcribed_text}")
            else:
                print(f"Error: {found_message}")

    # compare expected output and actual output
    assert found_message == expected_message, f"Expected message '{expected_message}', but got '{found_message}'"

    # check the transcribed text for valid input
    if expected_event == "confirmation":
        assert transcribed_text == "This is a test transcription.", f"Expected transcription text 'This is a test transcription.', but got '{transcribed_text}'"

    print("Test Passed!")
