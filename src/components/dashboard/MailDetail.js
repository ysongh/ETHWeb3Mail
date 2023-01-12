import React, { useEffect, useState } from 'react';
import { Paper, Avatar, IconButton } from '@mui/material';
import { Player } from '@livepeer/react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import { formatAddress } from "../../helpers/formatMethods";

function MailDetail({ currentMail, ethProvider, tablelandMethods, openSnackbar, setCurrentSection }) {
  const [fromAddress, setFromAddress] = useState("");
  const [fromURL, setFromURL] = useState("");
  
  useEffect(() => {
    if(currentMail.to[0] !== '0') resolveENS();
  }, [])
  
  const resolveENS = async () => {
    const resolver = await ethProvider.getResolver(currentMail.to);
    if(!resolver) return;
    setFromAddress(resolver.address)
    const avatar = await resolver.getText("avatar");
    setFromURL(avatar);
  }

  const deleteMail = async () => {
    // const removeRes = await tablelandMethods.write(`DELETE FROM ${tableName} WHERE id = ${currentMail.id};`);
    // console.log(removeRes);
    // openSnackbar();
    // setCurrentSection("All Mail");
  }

  return (
    <>
      <Paper style={{ padding: "0 1rem 0 0", marginBottom: ".5rem" }}>
        <div style={{ display: 'flex', justifyContent: "space-between"}}>
          <div>
            <IconButton size="large" color="secondary" onClick={() => setCurrentSection("All Mail")} style={{ marginRight: "1rem" }}>
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="large" color="secondary">
              <DeleteIcon fontSize="inherit" onClick={deleteMail} />
            </IconButton>
          </div>
         
        </div>
      </Paper>

      <Paper style={{ padding: "1rem" }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={currentMail.to} src={fromURL} />
          <p style={{ marginLeft: ".5rem", color: "gray", fontSize: ".8rem"}}>{formatAddress(currentMail.to)}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: "0"}}>{currentMail.subject}</h1>
          </div>
         
          <p>{currentMail.dateNow}</p>
        </div>
        
        <p>{currentMail.text}</p>
        {currentMail?.playbackId
          && <div style={{ maxWidth: '600px' }}>
              <Player
                title="Test"
                playbackId={currentMail.playbackId}
                showPipButton
                objectFit="cover"
                priority
              />
            </div>}
      </Paper>
    </>
    
  )
}

export default MailDetail;