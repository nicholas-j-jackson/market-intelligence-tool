import React, { Fragment } from 'react';
import { Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import "intro.js/introjs.css";
import Header from './Header';
import HomeScreen from './HomeScreen';
import ReviewScreen from './ReviewScreen';
import RegionalPriceScreen from './RegionalPriceScreen';
import Demo from './Demo'

const App = () => {
    return (
        <Container fluid expand="xl">
            <Header />
            <Fragment>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomeScreen/>}  />
                        <Route path="/reviews" element={<ReviewScreen/>} />
                        <Route path="/regional" element={<RegionalPriceScreen/>} />
                    </Routes>
                </Router>
            </Fragment>
        </Container>
    );
};

export default App;