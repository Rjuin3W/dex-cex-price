import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { FunctionComponent } from "react";

interface PriceComponentProps {
    name: string;
    price: any;
    link: any;
  }

  const PriceCEX: FunctionComponent<PriceComponentProps> = ({
    name, price, link
    }) => {
    return (
        <Grid container  sx={{ background: "#252526", textAlign: "center", padding: 2, margin: 1 , justifyContent: "center", alignItems: "center", width: {md: "80%", lg: "60%", xs: "100%"}, ml: "auto", mr: 'auto', marginBottom: "24px", boxShadow: 1}}>
            <Grid sx={{ marginRight: "5px", marginLeft: "5px", fontWeight: "bold" }}>
                {name} :
            </Grid>
            <Grid sx={{ marginRight: "5px", marginLeft: "5px" }}>
                {Number(price).toFixed(2)}$
            </Grid>
            <Grid sx={{ marginLeft: "24px", marginRight: "24px"}}>
                <Button onClick={() => window.open(link, '_blank')} sx={{border: 1, borderColor: "inherit"}}>Buy</Button>
            </Grid>
        </Grid>
    );
};

export default PriceCEX;