import React, { useEffect, useState } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import HttpService from "../services/HttpService";
import MessageCard from './MessageCard.tsx';
import InputAdornment from '@mui/material/InputAdornment';
import PhotoIcon from '@mui/icons-material/Photo';
import DeleteIcon from '@mui/icons-material/Delete';

function GroupChat() {
  useEffect(() => {
    HttpService.getMessagesWithGet().then((response) => {
      setMessages(response.data.messages);
      console.dir(response);
    })
  }, []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [photo64, setPhoto64] = useState("");
  const currentUser = localStorage.getItem("userhash");

  const bottomRef = React.useRef();

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto64(reader.result.slice(22));
      console.log(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      HttpService.sendMessage(message, photo64)
        .then(() => {
          HttpService.getMessages().then((response) => {
            setMessages(response.data.messages);
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
          });
        });
    }
  };

  function timeSort(time){
    const timeArray = time.split(/-|_/);
    let timeString = timeArray[2] + "." + timeArray[1] + "." + timeArray[0] + " " + timeArray[3] + ":" + timeArray[4];
    return timeString;
  }

  function messageLeftOrRight(usernickname){
    if(usernickname === currentUser){
      return "right";
    } else {
      return "left";
    }
  }

  useEffect(() => {
    setTimeout(() => {
      console.log("scrolling");
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 2000);
    /* if (document.readyState === 'complete') {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.addEventListener('load', () => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      });
      return () => window.removeEventListener('load', () => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
      );
    } */
  }, [messages]);

  console.dir(messages);
  console.dir(localStorage.getItem("loginToken"));

  return (
    <div id="GroupChatContainer" 
         style={{
          height: '100%',
          justifyContent: 'center',
          //overflow: 'hidden',
          display: "flex",
          flexDirection: 'column',
          position: 'relative',
         }}
    >
      <div className="messages"
      style={{overflowY: 'scroll',
              height: '100%',
              paddingBottom: '20dvh',
              display: 'flex',
              flexDirection: 'column',
            }}
      >
        {messages.map((message, index) =>
          <div key={index} sx={{ marginBottom: '30px', float: messageLeftOrRight(message)}}>
            <MessageCard
              usernickname={message.usernickname}
              time={message.time ? timeSort(message.time) : ""}
              text={message.text}
              photoid={message.photoid ? message.photoid : ""}
              isOwnMessage={message.userhash === currentUser}
            >
            </MessageCard>
          </div>
        )}
        <div ref={bottomRef} id="bottomRef"></div>
      </div>
      <div className="inputs" style={{width: '100%',
                                      display: 'flex',
                                      justifyContent: 'center'}}>
        <div className="frosted-glass-panel" style={{display: 'flex', 
                                                    position: 'fixed',
                                                    justifyContent: 'center',
                                                    bottom: '0',
                                                    alignItems: 'center',}}>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={handlePhotoChange}/>
            <PhotoCamera />
          </IconButton>
          <TextField
            className="message-input input-field"
            type="text"
            value={message}
            onChange={handleMessageChange}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  {photo64 &&(
                  <IconButton
                    aria-label="image attached"
                    edge="end"
                  >
                    +
                    <PhotoIcon color="secondary" />
                    <DeleteIcon color="secondary" onClick={() => {setPhoto64("")}}/>
                  </IconButton>
                  )}
                </InputAdornment>
            }}
            placeholder="Message"
            sx={{width: 'auto'}}
          />
          <Button 
            variant="contained"
            onClick={handleSendMessage}
            color="primary"
            className="button"
            sx={{marginLeft: '10px'}}
          >
              Send
          </Button>
        </div>
      </div>
    
    </div>
  );
}

export default GroupChat;
