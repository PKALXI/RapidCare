/**
 * Author: Pranav Kalsi
 * Last Modified: March 7th
 * Purpose: the AI chat functionality
 *
 * FIREBASE and backend Related operations and respective state management completed by Pranav Kalsi
 */
// https://mui.com/material-ui/material-icons/?query=send&selected=Send
// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/react-button/
// https://mui.com/material-ui/react-typography/

import { Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useRef, useState } from "react";
import { IMessage, IPatient } from "../../models/model";
import CircularProgress from "@mui/material/CircularProgress";
import { AIBrokerModule } from "../../api/AIAssistBroker";
import { onSnapshot, query } from "firebase/firestore";
import {
  addMessage,
  AIChatCollection,
} from "../../firebaseControllers/DatabaseOps";
import { v4 as uuidv4 } from "uuid";

const AIChat = (props: any) => {
  // state variables
  const [patient, setPatient] = useState<IPatient>(props.patient);
  const brokerReference = useRef<AIBrokerModule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  // Close the chat
  const handleClose = () => {
    brokerReference.current?.clearStore();
    props.setOpenChat(false);
  };

  // Load all of the chats
  useEffect(() => {
    const unsubscribeChats = onSnapshot(AIChatCollection, (querySnapshot) => {
      const messageList: IMessage[] = querySnapshot.docs
        .map((doc) => doc.data() as IMessage)
        .filter(
          (message) =>
            message.sender === patient.profileInformation?.demographics?.name ||
            message.reciever === patient.profileInformation?.demographics?.name
        )
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      setMessages(messageList);
    });

    // activate loading bar
    setIsLoading(true);

    // Set a reference to the broker and make an initial hit
    brokerReference.current = new AIBrokerModule();
    brokerReference.current.setVectorStore(props.patient, setIsLoading);

    return () => {
      unsubscribeChats();
    };
  }, []);

  // Send a query to the backend for the AI to answer
  const sendQuery = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent reload
    const response = brokerReference.current?.queryAI(
      query,
      patient.profileInformation?.demographics?.name || ""
    );
    const humanMessage: IMessage = {
      id: uuidv4(),
      sender: patient.profileInformation?.demographics?.name || "",
      reciever: "bot",
      date: new Date(),
      message: query,
    };

    setQuery("");
    console.log(response);

    // Add message to db for display
    addMessage(humanMessage);
  };

  return (
    // AI chat box
    <div className="bg-slate-100 p-3">
      <div className="flex">
        <div className="ml-1">
          <Typography variant="h6" gutterBottom>
            Query This Patient!
          </Typography>
        </div>

        <div onClick={handleClose} className="ml-auto">
          <CloseIcon />
        </div>
      </div>

      {/* Loading, and chat box availbel when context is loaded */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={sendQuery}>
          <div
            className="bg-slate-200 overflow-auto"
            style={{ maxHeight: "40vh" }}
          >
            {messages.map((message) => (
              <p
                key={message.id}
                className={
                  message.reciever ===
                  patient.profileInformation?.demographics?.name
                    ? "bg-slate-500"
                    : "bg-slate-300 text-right"
                }
              >
                {message.message}
              </p>
            ))}
          </div>

          <div className="flex items-center mt-2">
            <TextField
              id="outlined-basic"
              label="Chat..."
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              sx={{ marginLeft: "8px", height: "100%" }}
              type="submit"
            >
              <SendIcon />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AIChat;
