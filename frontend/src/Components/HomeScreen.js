import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown} from 'react-bootstrap';
import Header from './Header';
import FoodTable from './FoodTable';
import SelectRestaurantForm from './selectRestaurantForm';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';

import { listLocations } from '../actions/locationsActions';
import { listLocation1Prices, listLocation2Prices, listLocation3Prices } from '../actions/priceActions';

import Loader from './Loader';
import Message from './Message';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const locationList = useSelector((state) => state.locationList);
    const { loading, error, locations } = locationList;


    const location1PriceList = useSelector((state) => state.location1PriceList);
    const { loadingLocation1, errorLocation1, location1Prices } = location1PriceList;

    const location2PriceList = useSelector((state) => state.location2PriceList);
    const { loadingLocation2, errorLocation2, location2Prices } = location2PriceList;

    const location3PriceList = useSelector((state) => state.location3PriceList);
    const { loadingLocation3, errorLocation3, location3Prices } = location3PriceList;


    const [chain1, setChain1] = useState('');
    const [chain2, setChain2] = useState('');
    const [chain3, setChain3] = useState('');

    const chains = ['Jimmy Johns', 'FireHouse Subs', 'Jersey Mike\'s']

    const [location1, setLocation1] = useState('34190 US Highway 19 North');
    const [location2, setLocation2] = useState('9825 San Jose Blvd');
    const [location3, setLocation3] = useState('1554 South Federal Highway');

    const mapping = [{name: 'Jimmy Johns', type:'john'},
                    {name: 'FireHouse Subs', type:'fire'},
                    {name: 'Jersey Mike\'s', type:'mike'}]

    
    const updateLocation1 = (location) => {
        setLocation1(location);

        let loc = undefined;
        if (!(location === undefined || location.length == 0)){
            loc = locations.find(x => x.address === location.split(',')[0]);
        }
        
        if ( !(loc === undefined || loc.length == 0)){
            dispatch(listLocation1Prices(loc.type, loc.store_id));
        }
    }
    
    const updateLocation2 = (location) => {
        setLocation2(location);

        let loc = undefined;
        if (!(location === undefined || location.length == 0)){
            loc = locations.find(x => x.address === location.split(',')[0]);
        }

        if ( !(loc === undefined || loc.length == 0)){
            dispatch(listLocation2Prices(loc.type, loc.store_id));
        }
    }

    const updateLocation3 = (location) => {
        setLocation3(location);

        let loc = undefined;
        if (!(location === undefined || location.length == 0)){
            loc = locations.find(x => x.address === location.split(',')[0]);
        }
        
        if ( !(loc === undefined || loc.length == 0)){
            dispatch(listLocation3Prices(loc.type, loc.store_id));
        }
    }
    

    function filterLocations(chain){
        // If no objects in locations or is undefined, return empty array
        if (locations === undefined || locations.length == 0){
            return [];
        }
        else{
            let type = mapping.find(x => x.name === chain);
            if (type === undefined || type.length == 0){
                return [];
            }
            type = type.type;
            let filteredLocations = locations.filter(x => x.type === type);
            return filteredLocations;
        }
    }


    useEffect(() => {
        dispatch(listLocations());
        
    }, [dispatch]);

    


    // Create a dropdown with all of the restaurants

    return (
        <Container fluid expand="xl">
            <Row>
                <Col>
                <Form> 
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Select Chain to Compare</Form.Label>
                    <Form.Control as="select" custom onChange={e => setChain1(e.target.value)} defaultValue={chain1}>
                        {chains.map((chain) => (
                            <option>{chain}</option>
                        ))}
                        
                    </Form.Control>
                    </Form.Group>
                </Form>
                </Col>
    
                <Col>
                <Form> 
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Select Chain to Compare</Form.Label>
                    <Form.Control as="select" custom onChange={e => setChain2(e.target.value)} defaultValue={chain2}>
                        {chains.map((chain) => (
                            <option>{chain}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
                </Col>
    
                <Col>
                <Form> 
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Select Chain to Compare</Form.Label>
                    
                    <Form.Control as="select" custom onChange={e => setChain3(e.target.value)} defaultValue={chain3}>
                        {chains.map((chain) => (
                            <option>{chain}</option>
                        ))}
                    </Form.Control>
                    
                    </Form.Group>
                </Form>
                </Col>
            </Row>
    
    
            <Row>
    
            <Col>
                <SelectRestaurantForm locations={filterLocations(chain1)}
                                    chains={chains}
                                    chain={chain1}
                                    updateLocation={updateLocation1}
                                    location={location1}
                                    />
                </Col>

                <Col>
                <SelectRestaurantForm locations={filterLocations(chain2)}
                                    chains={chains}
                                    chain={chain2}
                                    updateLocation={updateLocation2}
                                    location={location2}
                                    />
                </Col>

                <Col>
                <SelectRestaurantForm locations={filterLocations(chain3)}
                                    chains={chains}
                                    chain={chain3}
                                    updateLocation={updateLocation3}
                                    location={location3}
                                    />
                </Col>

            </Row>
                
            <Row>
                <Col>
                    {loadingLocation1 ? (
                        <Loader />
                    ) : errorLocation1 ? (
                        <Message variant='danger'>{errorLocation1}</Message>
                    ) : (
                        <FoodTable location={location1} foods={location1Prices} priceString={"Price"}/>
                    )}
                </Col>
    
                <Col>
                    {loadingLocation2 ? (
                        <Loader />
                    ) : errorLocation2 ? (
                        <Message variant='danger'>{errorLocation2}</Message>
                    ) : (
                        <FoodTable location={location2} foods={location2Prices} priceString={"Price"}/>
                    )}
                </Col>
                
                <Col>
                    {loadingLocation3 ? (
                        <Loader />
                    ) : errorLocation3 ? (
                        <Message variant='danger'>{errorLocation3}</Message>
                    ) : (
                        <FoodTable location={location3} foods={location3Prices}/>
                    )}
                </Col>
    
            </Row>
    
        </Container>
    );
}
export default HomeScreen;