import { SetStateAction } from "react";
import { IMessage, IPatient } from "../models/model";
import { v4 as uuidv4 } from "uuid";
import { addMessage } from "../firebaseControllers/DatabaseOps";

export class AIBrokerModule {
  private AIServiceEndPoint: string = "http://127.0.0.1:5090";

  constructor() {
    
  }

  setVectorStore(
    patient: IPatient,
    setIsLoading: {
      (value: SetStateAction<boolean>): void;
      (arg0: (prev: any) => any): void;
    }
  ) {
    const formRequestData = new FormData();
    formRequestData.append("patient", JSON.stringify(patient));

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

  queryAI(query : string, patientName : string){
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

        addMessage(botMessage);

        return data.response;
      })
      .catch((error) => {
        console.error("Error storing vector:", error);
      });
  }

  clearStore(){
    fetch(`${this.AIServiceEndPoint}/clear`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Clear store response:", data);
      })
      .catch((error) => {
        console.error("Error clearing store:", error);
      });
  }
}
