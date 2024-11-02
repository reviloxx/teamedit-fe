import React from 'react';
import { AppBar, Toolbar, Typography, Tooltip, Box } from '@mui/material';

function AppHeader({ user }) {
    return (
        <AppBar position="fixed">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Typography variant="h5">Team Edit</Typography>
                <Tooltip title={user.name} arrow>
                    <Box
                        className="userIcon"
                        style={{ backgroundColor: user.color, fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}
                    >
                        {user.initials}
                    </Box>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}

export default AppHeader;
