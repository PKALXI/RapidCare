/** @file
 * 
 * Author: Pranav Kalsi
 * Last Updated: April 7th
 * Purpose: TranscriptionBrokerModule allows the frontend to interact with the backend services
 * 
 * Code especially socket code was written using: https://socket.io/
 * https://medium.com/@adrianhuber17/how-to-build-a-simple-real-time-application-using-flask-react-and-socket-io-7ec2ce2da977
 */

import { io } from "socket.io-client";
import { ISoapNote } from "../models/model";
import { SetStateAction } from "react";

/**
 * This class is responsible for all of the voice related services: Transcription, Diagnosis and Treatment Plan, Classification modules
 * @export
 * @class TranscriptionBrokerModule
 * @typedef {TranscriptionBrokerModule}
 */
export class TranscriptionBrokerModule {
  /**
   * Provides the endpoint to the transcription module
   *
   * @private
   * @type {string}
   */
  private transcribeServiceEndPoint: string = "http://127.0.0.1:5000";

  /**
   * Classification service endpoint
   *
   * @private
   * @type {string}
   */
  private classifyDiagnoseServiceEndPoint: string = "http://127.0.0.1:5050/predict";

  /**
   * Diagnosis and Treatment Plan endpoint
   *
   * @private
   * @type {string}
   */
  private classifyTextServiceEndPoint: string = "http://127.0.0.1:5010/predict";

  /**
   * This is the socket that will allow for communication.
   *
   * @private
   * @type {*}
   */
  private socket = io(this.transcribeServiceEndPoint, {
    transports: ["websocket"],
  });

  /**
   * Creates an instance of TranscriptionBrokerModule.
   *
   * @constructor
   * @param {(transcribedText: string) => void} transcriptionCallback 
   */
  constructor(transcriptionCallback: (transcribedText: string) => void) {
    // Connect to server
    this.socket.on("connect", () => {
      console.log("Connected to server!");
      
      // receive transcriptions
      this.socket.on("transcription", (result: { text: string }) => {
        transcriptionCallback(result.text);
        console.log("Transcription received:", result);
      });
    });
  }

  /**
   * Transcribe text through socket io
   *
   * @param {Blob} audioBlob 
   */
  transcribeText(audioBlob: Blob): void {
    audioBlob.arrayBuffer()
      .then((buffer) => {
        this.socket.emit("audio_chunk", buffer);
      })
      .catch((error) =>
        console.error("Error converting blob to array buffer:", error)
      );
  }

  /**
   * Give the give a diagnosis and treatment plan a hit
   *
   * @param {string} text 
   * @param {{
   *       (value: SetStateAction<ISoapNote>): void;
   *       (arg0: (prev: any) => any): void;
   *     }} setNote 
   * @returns {any): void; }) => void} 
   */
  diagnosePredictText(
    text: string,
    setNote: {
      (value: SetStateAction<ISoapNote>): void;
      (arg0: (prev: any) => any): void;
    }
  ) {
    // Create form data with the transcription
    const formRequestData = new FormData();
    formRequestData.append("transcription", text);

    // Perform the request to the diagnosis service
    fetch(this.classifyDiagnoseServiceEndPoint, {
      method: "POST",
      body: formRequestData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Get and process the data
        const response = JSON.parse(data.response);
        
        // Set the note in the component through this call back
        setNote((prev: any) => ({
          ...prev,
          assessment: {
            ...prev.assessment,
            diagnosis: response.diagnosis,
          },
          plan: response.plan,
        }));
      })
      .catch((error) => {
        console.error("Error classifying text:", error);
        return error;
      });
  }

  /**
   * Provide a classification of all of the text
   *
   * @param {string} text 
   * @param {{
   *       (value: SetStateAction<ISoapNote>): void;
   *       (arg0: (prev: any) => any): void;
   *     }} setNote 
   * @returns {any): void; }) => void} 
   */
  classifyPredictText(
    text: string,
    setNote: {
      (value: SetStateAction<ISoapNote>): void;
      (arg0: (prev: any) => any): void;
    }
  ) {
    // Form the formData for the request
    const formRequestData = new FormData();
    formRequestData.append("transcription", text);

    // Get the request and process the response 
    fetch(this.classifyTextServiceEndPoint, {
      method: "POST",
      body: formRequestData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Get the JSON response 
        const response = JSON.parse(data.response);

        // setNote 
        setNote((prev: any) => ({
          ...prev,
          subjective: {
            ...prev.subjective,
            reason: response.reason_for_visit,
            symptoms: response.symptoms,
            allergies: response.allergies,
            currentMedications: response.current_medication,
          },
        }));
      })
      .catch((error) => {
        console.error("Error classifying text:", error);
        return error;
      });
  }
}
