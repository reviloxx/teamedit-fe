import React from 'react';
import CollaborationApp from './components/CollaborationApp.jsx';
import AppHeader from './components/AppHeader';
import UserGenerator from './scripts/user-generator.js';

function App() {
    const user = UserGenerator.random();

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AppHeader user={user} />
            <CollaborationApp currentUser={user} />
        </div>
    );
}

export default App;
