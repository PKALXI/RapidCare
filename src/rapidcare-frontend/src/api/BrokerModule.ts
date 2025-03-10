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
    
    diagnosePredictText(text: string) {
        const formData = new FormData();
        formData.append('transcription', text);
    
        fetch('http://127.0.0.1:5050/predict', {
            method: 'POST',
            body: formData 
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log('data BROKER --- ' + data.response)
            return JSON.parse(data.response)
        })
        .catch(error => {
            console.error('Error classifying text:', error);
            return error
        });
    }

    // diagnosePredictText(text: string) {
    //     return new Promise((resolve, reject) => {
    //         const formData = new FormData();
    //         formData.append('transcription', text);
    
    //         fetch('http://127.0.0.1:5050/predict', {
    //             method: 'POST',
    //             body: formData
    //         })
    //         .then(response => response.json())  // Parse the response to JSON
    //         .then(data => {
    //             if (data.response) {
    //                 console.log('data BROKER ---', data.response);
    //                 resolve(data.response); 
    //                 return JSON.parse(data.response) // Resolve with the response
    //             } else {
    //                 reject(new Error('No response field in data'));  // Reject if no response
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error classifying text:', error);
    //             reject(error);  // Reject with the error
    //         });
    //     });
    // }
}