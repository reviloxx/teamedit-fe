import DocumentList from './components/DocumentList.jsx'
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {   
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5">
                        Team Edit
                    </Typography>
                </Toolbar>
            </AppBar>
            <DocumentList/>     
        </div>
    );
}

export default App;