/*
* Author: Pranav Kalsi
* Last Updated: April 7th 2025
* Purpose: This provides communication functionality between the AI Assist and frontend.
*/

import { SetStateAction } from "react";
import { IMessage, IPatient } from "../models/model";
import { v4 as uuidv4 } from "uuid";
import { addMessage } from "../firebaseControllers/DatabaseOps";

/**
 * Description placeholder
 *
 * @export
 * @class AIBrokerModule
 * @typedef {AIBrokerModule}
 */
export class AIBrokerModule {
  /**
   * end point for AI Service
   *
   * @private
   * @type {string}
   */
  private AIServiceEndPoint: string = "http://127.0.0.1:5090";

  /**
   * This method commununicates with the store endpoint which will provide the assistant context
   *
   * @param {IPatient} patient
   * @param {{
   *       (value: SetStateAction<boolean>): void;
   *       (arg0: (prev: any) => any): void;
   *     }} setIsLoading
   * @returns {any): void; }) => void}
   */
  setVectorStore(
    patient: IPatient,
    setIsLoading: {
      (value: SetStateAction<boolean>): void;
      (arg0: (prev: any) => any): void;
    }
  ) {
    //Set the form data for the request
    const formRequestData = new FormData();
    formRequestData.append("patient", JSON.stringify(patient));

    // perform the request and response procedure
    fetch(`${this.AIServiceEndPoint}/store`, {
      method: "POST",
      body: formRequestData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Vector store response:", data);
        setIsLoading(false);
        return data.response;
      })
      .catch((error) => {
        console.error("Error storing vector:", error);
      });
  }

  /**
   * This method actually allows for the query endpoint to be accesses
   *
   * @param {string} query
   * @param {string} patientName
   */
  queryAI(query: string, patientName: string) {
    // Set formData with query
    const formRequestData = new FormData();
    formRequestData.append("query", JSON.stringify(query));

    fetch(`${this.AIServiceEndPoint}/query`, {
      method: "POST",
      body: formRequestData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Vector store response:", data.response);
        const botMessage: IMessage = {
          id: uuidv4(),
          sender: "bot",
          reciever: patientName || "",
          date: new Date(),
          message: data.response || "",
        };

        // Add message to firebase
        addMessage(botMessage);

        return data.response;
      })
      .catch((error) => {
        console.error("Error storing vector:", error);
      });
  }

  /*
  * Clear the vector store on close such that assistant can be ready for next patient.
  */
  clearStore() {
    fetch(`${this.AIServiceEndPoint}/clear`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error clearing store:", error);
      });
  }
}
