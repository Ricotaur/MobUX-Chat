import { Box, Dialog, IconButton } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  text: String;
  photoid: String;
  usernickname: String;
  time: String;
  isOwnMessage: boolean,
}
    
function MessageCard({ usernickname, text, photoid, time, isOwnMessage }: PropsWithChildren<Props>): JSX.Element {
  let limitedText = text ?? ''; // use the entire text message
  if (limitedText.length === 0) {
    //return <></>; // don't render anything if there's no text
  }
  const rightLeft = isOwnMessage ? 'right' : 'left';
  const boxMargin = isOwnMessage ? '5px 10px 5px 10px': '10px';
  const imageSrc = "https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=getphoto&token=" + localStorage.getItem("loginToken") + "&photoid=" + photoid;
  let image;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (photoid) {
    image = <img src={imageSrc} alt="" style={{maxWidth: '100%',
                                               maxHeight: '100%',
                                               borderRadius: '8px'}}/>;
  }

  return (
    <Box className="frosted-glass-panel-messages" sx={{ display: 'inline-block',
                                                        margin: boxMargin,
                                                        padding: '0',
                                                        textAlign: 'left',
                                                        float: rightLeft ,
                                                        maxWidth: '80%'}}>
      <div className='username' style={{fontWeight: 'bold',
                                        padding: '0 0.4em 0.2em 0.4em'}}>
        {usernickname}
      </div>
      <div className='message-text' style={{fontWeight: 'normal',
                                            wordBreak: 'break-word',
                                            padding: '0.2em 0.4em 0.2em 0.4em'}}>
        {limitedText}
      </div>
      <div className='message-image' onClick={handleClickOpen}>
        {image}
      </div>
      <Dialog
      fullScreen
      PaperProps={{
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(1em)',
          boxShadow: 'none',
        },
      }}
        open={open}
        onClick={handleClose}
        onClose={handleClose}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{justifyContent: 'right'}}
        >
          <CloseIcon style={{color: 'whitesmoke'}}/>
        </IconButton>
        {image}
      </Dialog>
        <div className='message-date' style={{fontWeight: 'lighter',
                                              padding: '0 0.4em 0 0.4em'}}>
          {time}
        </div>
    </Box>
  );
}

export default MessageCard;