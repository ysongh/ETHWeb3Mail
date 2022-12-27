import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Divider, Button } from '@mui/material';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import LitJsSdk from 'lit-js-sdk';

import EVMWeb3Mail from '../artifacts/contracts/EVMWeb3Mail.sol/EVMWeb3Mail.json';
import Spinner from '../components/common/Spinner';
import {FUJI_CONTRACT, MUMBAI_CONTRACT, MOONBASE_CONTRACT, GOERLI_CONTRACT } from '../config';

function Home({ setWalletAddress, setpw3eContract, setChainName, setethProvider }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    setethProvider(provider);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);

    const { chainId } = await provider.getNetwork();
    console.log(chainId);

    if(chainId === 43113){
      const contract = new ethers.Contract(FUJI_CONTRACT, EVMWeb3Mail.abi, signer);
      console.log(contract);
      setChainName("fuji");
      setpw3eContract(contract);
    }
    else if(chainId === 1287){
      const contract = new ethers.Contract(MOONBASE_CONTRACT, EVMWeb3Mail.abi, signer);
      console.log(contract);
      setChainName("moonbase");
      setpw3eContract(contract);
    }
    else if(chainId === 80001){
      const contract = new ethers.Contract(MUMBAI_CONTRACT, EVMWeb3Mail.abi, signer);
      console.log(contract);
      setChainName("mumbai");
      setpw3eContract(contract);
    }
    else if(chainId === 5){
      const contract = new ethers.Contract(GOERLI_CONTRACT, EVMWeb3Mail.abi, signer);
      console.log(contract);
      setChainName("goerli");
      setpw3eContract(contract);
    }
    
    await connectToLitNetwork();
    navigate('./dashboard');
  }

  const connectToLitNetwork = async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    console.log(client);
    window.litNodeClient = client;

    document.addEventListener('lit-ready', function (e) {
      console.log('LIT network is ready')
      setLoading(false) // replace this line with your own code that tells your app the network is ready
    }, false)
  }

  return (
    <div className="primary-bg-color-200" style={{ height: "100vh"}}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column'}}>
        <Card style={{ marginTop: '10rem', maxWidth: '500px'}}>
          <CardContent>
            <h1 style={{ marginBottom: '.3rem' }}>Welcome to EVMWeb3Mail</h1>
            <p style={{ marginBottom: '1rem'}}>A decentralized, cross-chain, Web3 email platform</p>

            <Divider>Login With</Divider>
            <br />
            {loading
              ? <Spinner />
              : <>
                <Button variant="contained" color="primary" onClick={connectWallet} fullWidth>
                  MetaMask
                </Button>
              </>
            }
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default Home;