import { io } from "socket.io-client";
import { ISoapNote } from "../models/model";
import { SetStateAction } from "react";

export class BrokerModule {
    private transcribeServiceEndPoint: string = "http://127.0.0.1:5000";
    private classifyDiagnoseServiceEndPoint: string = "http://127.0.0.1:5050/predict";
    private classifyTextServiceEndPoint: string = "http://127.0.0.1:5080/predict";
    
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
    
        fetch(this.classifyDiagnoseServiceEndPoint, {
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

    classifyPredictText(text: string, setNote: { (value: SetStateAction<ISoapNote>): void; (arg0: (prev: any) => any): void; }) {
        const formRequestData = new FormData();
        formRequestData.append('transcription', text);
    
        fetch(this.classifyTextServiceEndPoint, {
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
                subjective: {
                    ...prev.subjective,
                    reason: response.reason_for_visit,
                    symptoms: response.symptoms,
                    allergies: response.allergies,
                    currentMedications: response.current_medication
                },
            }));

        })
        .catch(error => {
            console.error('Error classifying text:', error);
            return error
        });
    }
}