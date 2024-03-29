import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Snackbar, IconButton, CssBaseline, Toolbar } from '@mui/material';
import { LivepeerConfig, Player, createReactClient, studioProvider } from '@livepeer/react';

import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import Mail from '../components/dashboard/Mail';
import Send from '../components/dashboard/Send';
import MailDetail from '../components/dashboard/MailDetail';
import Setting from '../components/dashboard/Setting';

import CloseIcon from '@mui/icons-material/Close';

import { LIVEPEER_APIKEY } from '../config';

const client = createReactClient({
  provider: studioProvider({ apiKey: LIVEPEER_APIKEY }),
});

function Dashboard({ walletAddress, pw3eContract, chainName, ethProvider, ethSigner, domainData, setDomainData }) {
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState("All Mail");
  const [mailCount, setMailCount] = useState(0);
  const [currentMail, setCurrentMail] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(!walletAddress)  navigate('/');
  }, [])
  
  const openSnackbar= () => {
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <LivepeerConfig client={client}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar
          walletAddress={walletAddress}
          chainName={chainName}
          domainData={domainData}
          setDomainData={setDomainData}  />
        <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <Box
          className="primary-bg-color-200"
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          style={{ height: "100vh"}}
        >
          <Toolbar />
          {currentSection === "All Mail"
            && <Mail
              chainName={chainName}
              setMailCount={setMailCount}
              walletAddress={walletAddress}
              pw3eContract={pw3eContract}
              setCurrentSection={setCurrentSection}
              setCurrentMail={setCurrentMail}
              isMySend="no" /> }
          {currentSection === "Message"
            && <p>Message</p> }
          {currentSection === "Send"
            && <Send
              mailCount={mailCount}
              chainName={chainName}
              pw3eContract={pw3eContract}
              walletAddress={walletAddress}
              ethProvider={ethProvider}
              openSnackbar={openSnackbar}
              ethSigner={ethSigner}
              /> }
          {currentSection === "Mail Detail"
            && <MailDetail
              currentMail={currentMail}
              ethProvider={ethProvider}
              openSnackbar={openSnackbar}
              setCurrentSection={setCurrentSection} /> }
          {currentSection === "My Send Mail"
            && <Mail
              chainName={chainName}
              setMailCount={setMailCount}
              walletAddress={walletAddress}
              pw3eContract={pw3eContract}
              setCurrentSection={setCurrentSection}
              setCurrentMail={setCurrentMail}
              isMySend="yes" /> }
          {currentSection === "Setting"
            && <Setting 
              walletAddress={walletAddress}
              ethSigner={ethSigner} /> }
        </Box>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          message="Success"
          severity="success"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Box>
    </LivepeerConfig>
  )
}

export default Dashboard;