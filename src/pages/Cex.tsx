import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Tabs, Tab } from '@mui/material'
import Route from '../components/Route';
import Price from '../components/PriceCEX';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


const Cex = () => {

    const [priceBinance, setPriceBinance]: any = useState([]);
    const [priceBybit, setPriceBybit]: any = useState([]);
    const [priceHuobi, setPriceHuobi]: any = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getInfo();
      }, []);

    const urlAPIBinance = "https://api.binance.com/api/v3/ticker/24hr?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22AVAXUSDT%22,%22XRPUSDT%22,%22DOGEUSDT%22]"
    const urlAPIbyBit = "https://api-testnet.bybit.com/v2/public/tickers"
    const urlAPIHuobi = "https://api.huobi.pro/market/detail/merged"

    const byBitToken = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'DOGEUSDT', 'AVAXUSDT']
    const TOKEN = ['BTC_USDT', 'ETH_USDT', 'XRP_USDT', 'DOGE_USDT', 'AVAX_USDT']
    const HuobiToken = ['btcusdt', 'ethusdt', 'xrpusdt', 'dogeusdt', 'avaxusdt']

    async function getInfo(){
      setIsLoading(true);
        const responseBinance = await axios
        .get(urlAPIBinance)
        .then((responseBinance) => responseBinance.data)
        setPriceBinance(responseBinance);
        for (let i = 0; byBitToken.length > i; i++) {
          const responseBybit: any = await axios
          .get(urlAPIbyBit + '?symbol=' + byBitToken[i])
          .then((responseBybit) => responseBybit.data)
          priceBybit.push(responseBybit.result[0]);
        }
        for (let i = 0; HuobiToken.length > i; i++) {
          const responseHuobi: any = await axios
          .get(urlAPIHuobi + '?symbol=' + HuobiToken[i])
          .then((responseHuobi) => responseHuobi.data)
          priceHuobi.push(responseHuobi.tick)
        }
        setIsLoading(false);
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
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="inherit" centered>
                    <Tab label='Binance' {...a11yProps(0)} />
                    <Tab label='Bybit' {...a11yProps(1)} />
                    <Tab label='Huobi' {...a11yProps(2)} />
                </Tabs>
            </Box>
        <TabPanel value={value} index={0}>
            {isLoading ? <Grid sx={{ textAlign: "center", marginTop: "36px" }}><CircularProgress /> </Grid>: priceBinance.map((tokenInfo: any, i: any) => (
                <Price price={tokenInfo.lastPrice} name={tokenInfo.symbol} low={tokenInfo.lowPrice} high={tokenInfo.highPrice} link={`https://www.binance.com/fr/trade/${TOKEN[i]}`} />
            ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {isLoading ? <Grid sx={{ textAlign: "center", marginTop: "36px" }}><CircularProgress /></Grid> : priceBybit.map((tokenInfo: any, i: any) => (
                <Price price={tokenInfo.ask_price} name={tokenInfo.symbol} low={tokenInfo.low_price_24h} high={tokenInfo.high_price_24h} link={`https://www.bybit.com/trade/usdt/${tokenInfo.symbol}`} />
            ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
            {isLoading ? <Grid sx={{ textAlign: "center", marginTop: "36px" }}><CircularProgress /></Grid>  : priceHuobi.map((tokenInfo: any, i: any) => (
                <Price price={tokenInfo.ask[0]} name={HuobiToken[i].toUpperCase()} low={tokenInfo.low} high={tokenInfo.high} link={`https://www.huobi.com/fr-fr/exchange/${TOKEN[i]}/`} />
            ))}
        </TabPanel>
        </Grid>            
        </Grid>
    );
};

export default Cex;