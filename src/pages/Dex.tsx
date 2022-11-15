import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Tabs, Tab, Button } from '@mui/material'
import Route from '../components/Route';
import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import ABIinch from '../rpc/ABI.json'
import Price from '../components/PriceDEX'
import CircularProgress from '@mui/material/CircularProgress';


declare var window: any

const Dex = () => {

  const [pricetoken, setPrice]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [chainID, setChainID] : any = useState();


    useEffect(() => {
      checkConnected();
      checkNetwork();
      price();
      }, []);

    const aggregatorETH = "0x07D91f5fb9Bf7798734C3f606dB065549F6893bb";
    const daistablecoin = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    const tokenETH = [
      {
        name: "BNB-DAI",
        token: "0x418D75f65a02b3D53B2418FB8E1fe493759c7605" 
      },
      {
        name: "ETH-DAI",
        token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" 
      },
      {
        name: "XRP-DAI",
        token: "0x39fBBABf11738317a448031930706cd3e612e1B9" 
      },
      {
        name: "AAVE-DAI",
        token: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9" 
      },
      {
        name: "AVAX-DAI",
        token: "0x85f138bfEE4ef8e540890CFb48F620571d67Eda3"
      }
    ]

    async function price() {
      try {
        if (window.ethereum) {
          setIsLoading(true);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            aggregatorETH,
            ABIinch,
            signer
          );
          for (let i = 0; tokenETH.length > i; i++) {
            pricetoken.push(await contract.getRate(tokenETH[i].token, daistablecoin, false));
          }
          setIsLoading(false);
          console.log(pricetoken)
        }
      } catch (err) {
        console.log(err);
      }
    }

    const connectWallet = async () => {
      try {
          const { ethereum } = window;
          
          if (!ethereum) {
              alert("Need Wallet !");
              return;
            }
            
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]); 
} catch (error) {
    console.log(error)
}
}

    const checkConnected = async () => {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]); 
  }

    function IsNotConnected() {
      return <Grid>
      <Typography sx={{ textAlign: "center" }}>You need to connect your wallet and be on Ethereum Network to see onchain price.</Typography>
      <Grid sx={{ textAlign: "center", marginTop: "10px" }}>
      <Button sx={{ width: "30%", ml: "auto", mr: "auto", alignItems: "center", marginTop: "24px", fontSize: "16px", fontWeight: "bold" }} onClick={connectWallet}>Connect</Button>
      </Grid>
      </Grid>
  }

    async function checkNetwork() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const chainID = await provider.getNetwork();
      setChainID(chainID.chainId);
    }

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
      }
      
      function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
        <Grid>
            <Route />
            <Grid sx={{ width: "70%", ml: "auto", mr: "auto", color: "white" }}>
            <Box sx={{ width: '100%', color: "white" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="inherit" centered>
                    <Tab label='Ethereum (Based on 11 DEX)' {...a11yProps(0)} />
                </Tabs>
            </Box>
        <TabPanel value={value} index={0}>
        {chainID === 1 ? currentAccount ? isLoading ? <Grid sx={{ textAlign: "center", marginTop: "36px" }}><CircularProgress /></Grid> : pricetoken.map((tokenInfo: any, i: any) => (
                <Price price={formatEther(tokenInfo._hex)} name={tokenETH[i].name} />
            )) : <IsNotConnected /> : <IsNotConnected />}
        </TabPanel>
        </Grid>            
        </Grid>
    );
};

export default Dex;