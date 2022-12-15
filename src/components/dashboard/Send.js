import React, { useState } from 'react';
import { Paper, Box, Tabs, Tab } from '@mui/material';
import SendMail from './SendMail';
import SendNFT from './SendNFT';

function Send({ tablelandMethods, tableName, mailCount, pw3eContract,chainName, openSnackbar, walletAddress, domainData }) {
  const [currentSection, setCurrentSection] = useState("Send Mail");

  const handleChange = (event, newValue) => {
    setCurrentSection(newValue);
  };

  return (
    <Paper sx={{ width: '100%' }} style={{ padding: "1rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentSection} onChange={handleChange}>
          <Tab label="Send Mail" value="Send Mail" />
          <Tab label="Send NFT" value="Send NFT" />
        </Tabs>
      </Box>
      <br />
      {currentSection === "Send Mail"
        && <SendMail
          tablelandMethods={tablelandMethods}
          tableName={tableName}
          mailCount={mailCount}
          chainName={chainName}
          pw3eContract={pw3eContract}
          openSnackbar={openSnackbar}
          walletAddress={walletAddress}
          domainData={domainData} /> }
      {currentSection === "Send NFT"
        && <SendNFT /> }
    </Paper>
  )
}

export default Send;