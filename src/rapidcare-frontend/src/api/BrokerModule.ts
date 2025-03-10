import { io } from "socket.io-client";

export class BrokerModule {
    private transcribeServiceEndPoint: string = "http://127.0.0.1:5000";
    private classifyTextServiceEndPoint: string = "";
    private chunks: Blob[] = [];
    // private _hasTranscriptionListener: boolean = false;
    
    private socket = io(this.transcribeServiceEndPoint, {
        transports: ['websocket']
    });
    
    constructor(transcriptionCallback : (transcribedText : string) => void){
        this.socket.on('connect', () => {
        console.log('Connected to server!');

            this.socket.on('transcription', (result: { text: string }) => {
                transcriptionCallback(result.text)
                console.log('Transcription received:', result);
            });
        });
    }

    transcribeText(audioBlob: Blob ): void {
        audioBlob.arrayBuffer()
        .then((buffer) => {
          this.socket.emit('audio_chunk', buffer);
        })
        .catch((error) => console.error('Error converting blob to array buffer:', error));
    }
    
    classifyText(text: string): string {
        // TO DO: implement text classification logic
        return text;
    }
}