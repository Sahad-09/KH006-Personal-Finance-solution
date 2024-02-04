import { useState } from "react";
import {
  Modal,
  Typography,
  Box,
  TextField,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import AIresponse from "../../components/AIresponse";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);

    const res = await axios.post("http://localhost:3000/chat", { prompt });
    setResponse(res);
    setLoading(false);
    console.log(res);
  };

  return (
    <div>
      <div className="app">
        {/* <img src={logo}  /> */}
        <button onClick={handleOpen} className="btn">
          Ask me anything
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="chatmodal">
          <Box className="container">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Drop your Questions
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onSubmit={(e) => {
                  handleSubmit(e);
                }}>
                <TextField
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  id="outlined-basic"
                  label="Query"
                  variant="outlined"
                  sx={{ margin: "15px 0px", width: "100%" }}
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </form>
              {loading && (
                <LinearProgress color="success" sx={{ margin: "20px 0px" }} />
              )}
              {response && <AIresponse response={response} />}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Chat;
