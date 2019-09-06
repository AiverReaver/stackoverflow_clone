import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PostsList from './components/PostsList/PostsList';
import Navbar from './components/Navbar/Navbar';

function App() {
    return (
        <div>
            <Navbar />

            <BrowserRouter>
                <Route path="/" exact component={PostsList} />
            </BrowserRouter>
        </div>
    );
}

export default App;
