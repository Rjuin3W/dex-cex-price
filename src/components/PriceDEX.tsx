import React from 'react';
import { Grid, Typography } from '@mui/material';
import { FunctionComponent } from "react";

interface PriceComponentProps {
    name: string;
    price: any;

  }

  const PriceCEX: FunctionComponent<PriceComponentProps> = ({
    name, price
    }) => {
    return (
        <Grid container  sx={{ background: "#252526", textAlign: "center", padding: 2, margin: 1 , justifyContent: "center", alignItems: "center", width: {md: "50%", xs: "100%"}, ml: "auto", mr: 'auto', marginBottom: "24px", boxShadow: 1}}>
            <Grid sx={{ marginRight: "5px", marginLeft: "5px", fontWeight: "bold" }}>
                {name} :
            </Grid>
            <Grid sx={{ marginRight: "5px", marginLeft: "5px" }}>
                {Number(price).toFixed(2)}$
            </Grid>
        </Grid>
    );
};

export default PriceCEX;