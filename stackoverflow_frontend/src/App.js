import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import PostsList from './components/PostsList/PostsList';
import Navbar from './components/Navbar/Navbar';
import PostDetail from './components/PostDetail/PostDetail';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Container>
                    <Route path="/" exact component={PostsList} />
                    <Route path="/questions/:id" exact component={PostDetail} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
