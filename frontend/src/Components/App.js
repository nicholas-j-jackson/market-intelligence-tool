import React, { Fragment } from 'react';
import { Container, NavItem} from 'react-bootstrap';
import axios from 'axios';
import {Row, Col, Form} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import FoodTable from './FoodTable';
import SelectRestaurantForm from './selectRestaurantForm';
import Header from './Header';
import HomeScreen from './HomeScreen';

const App = () => {
    return (
        <Container fluid expand="xl">
            <Header />
            <Fragment>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomeScreen/>}  />
                        <Route path="/review" element={<div>review</div>} />
                    </Routes>
                </Router>
            </Fragment>
        </Container>
    );
};

export default App;