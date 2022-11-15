import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { FunctionComponent } from "react";


interface PriceComponentProps {
    name: string;
    price: string;
    low: string;
    high: string;
    link: string;
  }

  const PriceCEX: FunctionComponent<PriceComponentProps> = ({
    name, price, low, high, link
    }) => {
    return (
        <Grid container  sx={{ background: "#252526", textAlign: "center", padding: 2, margin: 1 , justifyContent: "center", alignItems: "center", width: {md: "80%", lg: "60%", xs: "100%"}, ml: "auto", mr: 'auto', marginBottom: "24px", boxShadow: 1}}>
            <Grid sx={{ marginRight: "5px", marginLeft: "5px", fontWeight: "bold" }}>
                {name} :
            </Grid>
            <Grid sx={{ marginRight: "5px", marginLeft: "5px" }}>
                {Number(price).toFixed(2)}$
            </Grid>
            <Grid sx={{ marginLeft: "5px" }}>
                <Typography sx={{ color: "red" }}>⬇️: {Number(low).toFixed(2)}$</Typography>
            </Grid>
            <Grid sx={{ marginLeft: "5px"}}>
                <Typography sx={{ color: "greenyellow" }}>⬆️: {Number(high).toFixed(2)}$</Typography>
            </Grid>
            <Grid sx={{ marginLeft: "24px", marginRight: "24px"}}>
                <Button onClick={() => window.open(link, '_blank')} sx={{border: 1, borderColor: "inherit"}}>Buy</Button>
            </Grid>
        </Grid>
    );
};

export default PriceCEX;