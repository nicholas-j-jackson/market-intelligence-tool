import React, { Fragment } from 'react';
import { Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import "intro.js/introjs.css";
import Header from './Header';
import HomeScreen from './HomeScreen';
import ReviewScreen from './ReviewScreen';
import RegionalPriceScreen from './RegionalPriceScreen';
import LoginScreen from './LoginScreen';
import Demo from './Demo'
import {sessionService} from 'redux-react-session';
import { current } from '@reduxjs/toolkit';
import AccountScreen from './AccountScreen';

const App = () => {
    return (
        <Container fluid expand="xl">
            <Header />
            <Fragment>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomeScreen/>}  />
                        <Route path="/login" element={<LoginScreen/>} />
                        <Route path="/account" element={<AccountScreen/>} />
                        <Route path="/reviews" element={<ReviewScreen/>} />
                        <Route path="/regional" element={<RegionalPriceScreen/>} />
                        <Route path="/login" element={<LoginScreen/>} />
                    </Routes>
                </Router>
            </Fragment>
        </Container>
    );
};

export default App;