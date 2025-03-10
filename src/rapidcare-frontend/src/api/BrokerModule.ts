import { io } from "socket.io-client";
import { ISoapNote } from "../models/model";
import { SetStateAction } from "react";

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
    
    diagnosePredictText(text: string, setNote: { (value: SetStateAction<ISoapNote>): void; (arg0: (prev: any) => any): void; }) {
        const formRequestData = new FormData();
        formRequestData.append('transcription', text);
    
        fetch('http://127.0.0.1:5050/predict', {
            method: 'POST',
            body: formRequestData 
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log('data BROKER --- ' + data.response)
            const response = JSON.parse(data.response);

            setNote((prev: any) => ({
                ...prev,
                assessment: {
                    ...prev.assessment,
                    diagnosis: response.diagnosis
                },
                plan: response.plan
            }));
        })
        .catch(error => {
            console.error('Error classifying text:', error);
            return error
        });
    }
}