// https://mui.com/material-ui/material-icons/?query=send&selected=Send
// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/react-button/
// https://mui.com/material-ui/react-typography/

import { Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const AIChat = (props: any) => {

  const handleClose = () => {
    props.setOpenChat(false);
  };

  return (
    <div className="bg-slate-100 p-3">
      <form>
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

        <div
          className="bg-slate-200 overflow-auto"
          style={{ maxHeight: "40vh" }}
        >
          <p className="bg-slate-500">USER SENT</p>
          <p className="bg-slate-300 text-right">USER SENT</p>
          <p className="bg-slate-300">USER SENT</p>
          <p className="bg-slate-300 text-right">USER SENT</p>
          <p className="bg-slate-300">USER SENT</p>
          <p className="bg-slate-300 text-right">USER SENT</p>
          <p className="bg-slate-300">USER SENT</p>
          <p className="bg-slate-300 text-right">USER SENT</p>
          <p className="bg-slate-300">USER SENT</p>
          <p className="bg-slate-300 text-right">USER SENT</p>
          <p className="bg-slate-300">USER SENT</p>
          <p className="bg-slate-300 text-right">USER SENT</p>
          <p className="bg-slate-300">USER SENT</p>
          <p className="bg-slate-300 text-right">USER SENT</p>
          <p className="bg-slate-300">USER SENT</p>
        </div>

        <div className="flex items-center mt-2">
          <TextField
            id="outlined-basic"
            label="Chat..."
            variant="outlined"
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
    </div>
  );
};

export default AIChat;
