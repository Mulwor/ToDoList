import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import {orange} from "@mui/material/colors";


export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1, padding: "15px" }}>
            <AppBar position = "static"
                    sx={{backgroundColor: orange[500], boxShadow: '4px 4px brown'}}>

                    <Toolbar>

                        <IconButton size="large" edge="start" aria-label="menu">
                            <MenuIcon  sx={{ flexGrow: 1,}}/>
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{flexGrow: 1,}}> Trello </Typography>

                        <Button color="inherit">Login</Button>

                    </Toolbar>

            </AppBar>
        </Box>
    );
}
