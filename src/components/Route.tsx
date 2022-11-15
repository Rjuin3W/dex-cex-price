import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const Route = () => {
    let navigate = useNavigate();
    return (
        <Grid container>
            <Grid item xs={6} sx={{ textAlign: "right", padding: 4 }}>
                <Button onClick={() => navigate("/dex")}>Price on Dex</Button>
            </Grid>
            <Grid item xs={6} sx={{ padding: 4 }}>
            <Button onClick={() => navigate("/cex")}>Price on Cex</Button>
            </Grid>
        </Grid>
    );
};

export default Route;