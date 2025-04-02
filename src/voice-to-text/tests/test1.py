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

import unittest
import socketio
import time

# Create socket for testing
sio = socketio.Client()

transcription_text = ""

"""
Below are the socket events the broker that interacted with this service would use
"""
@sio.event
def connect():
    print("Connected to the server")


@sio.event
def disconnect():
    print("Disconnected from the server")


@sio.on("transcription")
def on_transcription(data):
    global transcription_text
    transcription_text = data["text"]


@sio.on("transcription_error")
def on_transcription_error(data):
    global transcription_error
    transcription_error = True


class TestSocketIOTranscription(unittest.TestCase):
    def setUp(self):
        self.HOST = "127.0.0.1"
        self.PORT = 5000
        self.AUDIO_FILE = "recording.webm"

    """
    Try valid audio -> Expected pass.
    """
    def testAudioTranscription(self):
        try:
            sio.connect(f"http://{self.HOST}:{self.PORT}")

            with open(self.AUDIO_FILE, "rb") as audio_file:
                audio_chunk = audio_file.read()

            sio.emit("audio_chunk", audio_chunk)

            time.sleep(2)

            sio.disconnect()

            self.assertEqual(transcription_text, "This is a test transcription.")

        except Exception as e:
            self.fail(f"Test failed with error: {str(e)}")

    """
    Try invalid audio -> Expected fail.
    """
    def testInvalidAudio(self):
        try:
            sio.connect(f"http://{self.HOST}:{self.PORT}")

            with open("invalid.webm", "rb") as audio_file:
                audio_chunk = audio_file.read()

            sio.emit("audio_chunk", audio_chunk)

            time.sleep(2)

            sio.disconnect()

            self.assertEqual(transcription_text, "")

        except Exception as e:
            self.fail(f"Test failed with error: {str(e)}")


if __name__ == "__main__":
    unittest.main()
