import React, { useEffect, useState, Fragment } from 'react';
import { Container, Row, Col, Dropdown, Button, ButtonGroup} from 'react-bootstrap';
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
import Demo from './Demo';
import axios from 'axios';


const HERE_API_KEY = 'EOCZRVAhmNCHpc7ze6ortW5m3BhO9t7I0blnnPqvhUM' //process.env.HERE_APIKEY;

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


    // Define constant pieces of data used to populate the dropdowns
    const chains = ['Jimmy Johns', 'FireHouse Subs', 'Jersey Mike\'s']
    const stateList = ['', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    const mapping = [{name: 'Jimmy Johns', type:'john'},
                    {name: 'FireHouse Subs', type:'fire'},
                    {name: 'Jersey Mike\'s', type:'mike'}]


    // Define the state variables used to store the user's search criteria
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [advancedToggle, setAdvancedToggle] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [priceSortType, setPriceSortType] = useState('Low-High');
    const [userAddress, setUserAddress] = useState('655 Reitz Union Drive');
    const [userZip, setUserZip] = useState('32603');
    const [userState, setUserState] = useState('FL');
    const [userLat, setUserLat] = useState('');
    const [userLong, setUserLong] = useState('');
    const [maxDist, setMaxDist] = useState(50);

    // Define the state variables used to store the user's selected chain and location
    const [chain1, setChain1] = useState('');
    const [chain2, setChain2] = useState('');
    const [chain3, setChain3] = useState('');

    // Create the state variables used to store the user's selected location and give default values
    const [location1, setLocation1] = useState('34190 US Highway 19 North');
    const [location2, setLocation2] = useState('9825 San Jose Blvd');
    const [location3, setLocation3] = useState('1554 South Federal Highway');
    const [sorted, setSorted] = useState(false);



    // Provide the update functions for the state variables
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
    

    // Define the state variables used to store the user's selected food items
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
            filteredLocations = [...new Set(filteredLocations)]; // Remove duplicates



            if (userLat !== ''){
                filteredLocations = filteredLocations.map(x => {
                    x.distance = Math.round(distance(userLat, userLong, x.latitude, x.longitude, 'M') * 10) / 10;
                    return x;
                });
        
                filteredLocations.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
            }

            
            if (userLat !== ''){
                filteredLocations = filteredLocations.filter(x => x.distance <= maxDist);
            }

            return filteredLocations;
        }
    }

    function filterPrices(locationPrices){
        // Remove duplicates

        // Remove duplicate item and price combinations
        // Set all _id to 0
        locationPrices = locationPrices.map(x => {
            x._id = 0;
            x.time = "";
            if (x.type === 'john'){
                x.price = x['price '];
            }
            return x;
        });

        let filteredPrices = [...new Set(locationPrices)]; // Remove duplicates

        // If items have the same name and size, keep the first one
        filteredPrices = locationPrices.filter((thing, index, self) =>
            index === self.findIndex((t) => ( t.item === thing.item && t.size === thing.size))
        );


        
        if (priceSortType === 'Low-High' && filteredPrices.length > 0){
            
            filteredPrices.sort((a, b) => (a.price > b.price) ? 1 : -1);
        }
        else{
            filteredPrices.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }
        
        
        // Remove non-ASCII characters
        filteredPrices = filteredPrices.map(x => {
            x.item = x.item.replace(/[^\x00-\x7F]/g, "");
            return x;
        });

        // Remove Specials characters
        filteredPrices = filteredPrices.map(x => {
            x.item = x.item.replace(/[^a-zA-Z0-9 ]/g, "");
            return x;
        });


        // Remove non-ASCII characters from size
        filteredPrices = filteredPrices.map(x => {
            x.size = x.size.replace(/[^\x00-\x7F]/g, "");
            return x;
        });

        // Remove Specials characters from size
        filteredPrices = filteredPrices.map(x => {
            x.size = x.size.replace(/[^a-zA-Z0-9 ]/g, "");
            return x;
        });


        if (minPrice > 0){
            filteredPrices = filteredPrices.filter(x => parseFloat(x.price) >= minPrice);
        }

        if (maxPrice < 100){
            filteredPrices = filteredPrices.filter(x => parseFloat(x.price) <= maxPrice);
        }


        return filteredPrices;
    }


        
    // Define the distance function to calculate the distance between two addresses
    function distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {

            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }



    // Define a function to dispatch the correct action based on the user's search criteria
    function SearchLocations(){
    
        /*
        if (state === '' && zip === '' && city === ''){
            dispatch(listLocations());
        }
        else if (zip === '' && city === ''){
            dispatch(listLocationsByState(state));
        }
        else if (city === ''){
            dispatch(listLocationsByStateAndZip(state, zip));
        }
        else if (zip === ''){
            dispatch(listLocationsByStateAndCity(state, city));
        }
        else{
            dispatch(listLocationsByStateAndCityAndZip(state, zip, city));
        }
        */
       dispatch(listLocations());

        if( userAddress !== '' || userZip !== '' && userState !== ''){
            let modifiedAddress = userAddress.replaceAll(" ", "+").replaceAll(",", "%2C").replaceAll(".", "%2E").replaceAll("#", "%23").replaceAll("&", "%26").replaceAll(":", "%3A");


            let URL = "https://geocode.search.hereapi.com/v1/geocode?q=" + modifiedAddress + "&limit=4&apiKey=" + HERE_API_KEY


            // Make a get request to the HERE API to get the user's coordinates
            axios.get(URL)
            .then(response => {
                setUserLong(response.data.items[0].position.lng);
                setUserLat(response.data.items[0].position.lat);

            })
        }

    }

    function updateUserZip(zip){
        setUserZip(zip);
    }


    function switchToggle(){
        if (advancedToggle){
            setSorted(false);
            setMaxDist(50);
            setMinPrice(0);
            setMaxPrice(100);

            /*
            setUserAddress('');
            setUserLat(0);
            setUserLong(0);
            setUserZip('');
            setUserState('');
            */
        }
        setAdvancedToggle(!advancedToggle);
    }

    // Dispatch the action to get the locations from the backend
    useEffect(() => {
        SearchLocations();
        
    }, [dispatch]);

    



    // Create a dropdown with all of the restaurants

    return (
        <Container fluid expand="xl">
        <Demo></Demo>
            <div id="step1">
            <Row>                
                <Col>
                    <Form>

                        <Form.Group controlId="formState">
                            <Form.Label>Select State</Form.Label>
                            <Form.Control as="select" custom onChange={e => setUserState(e.target.value)} defaultValue={userState}>
                                {stateList.map((state) => (
                                    <option>{state}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>

                </Col>

                <Col>
                    {userState === '' ? <div/> :     
                    <Form>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Enter Your Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" onChange={e => setUserAddress(e.target.value)} defaultValue={userAddress}/>
                        </Form.Group>
                    </Form>
                    }
                </Col>

                <Col>
                    {userState === '' ? <div/> :                     
                    <Form>
                    <Form.Group controlId="formUserZip">
                        <Form.Label>Enter Your Zip Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter Zip" onChange={e => updateUserZip(e.target.value)} defaultValue={userZip}/>
                    </Form.Group>
                    </Form>
                    }
                </Col>
            </Row>

            {userState === '' ? <div/> :
            <Row>
            <Form> 
                <ButtonGroup>
                    <Button variant="primary" onClick={e => SearchLocations()}>Search near this location</Button>
                </ButtonGroup>

            </Form>
            </Row>
            }
            </div>

            
            <Row id="step2">
                <Form> 
                    <ButtonGroup toggle>
                        <Button variant="primary" onClick={e => switchToggle()}>Toggle Advanced Search</Button>
                    </ButtonGroup>

                </Form>
            </Row>

            { !advancedToggle ? <div/>  :
            <Container fluid expand="xl">
            
            
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formMin">
                            <Form.Label>Enter Min Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter Price" onChange={e => setMinPrice(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Col>

                <Col>
                    <Form>
                        <Form.Group controlId="formMax">
                            <Form.Label>Enter Max Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter Price" onChange={e => setMaxPrice(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Col>

                <Col>
                    <Form>
                        <Form.Group controlId="formSort">
                            <Form.Label>Sort Price By</Form.Label>
                            <Form.Control as="select" custom onChange={e => setPriceSortType(e.target.value)} defaultValue={priceSortType}>
                                <option>Low-High</option>
                                <option>High-Low</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    
                </Col>
                <Col/>
                <Col/>


            </Row>

            
            <Row> 
                <Form>
                    <Form.Group controlId="formMax">
                        <Form.Label>Enter Maximum Distance (miles)</Form.Label>
                        <Form.Control type="text" placeholder="Enter Distance" onChange={e => setMaxDist(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Row>



            <Row>
                <Form> 
                    <ButtonGroup>
                        <Button variant="primary" onClick={e => SearchLocations()}>Apply Filters</Button>
                    </ButtonGroup>

                </Form>
            </Row>

            </Container>
            }


            <Row id="step3">
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
    
    
            <Row id="step4">
    
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
                
            <Row id="step5">
                <Col>
                    {loadingLocation1 ? (
                        <Loader />
                    ) : errorLocation1 ? (
                        <Message variant='danger'>{errorLocation1}</Message>
                    ) : (
                        <FoodTable location={location1} foods={filterPrices(location1Prices)} priceString={"Price"}/>
                    )}
                </Col>
    
                <Col>
                    {loadingLocation2 ? (
                        <Loader />
                    ) : errorLocation2 ? (
                        <Message variant='danger'>{errorLocation2}</Message>
                    ) : (
                        <FoodTable location={location2} foods={filterPrices(location2Prices)} priceString={"Price"}/>
                    )}
                </Col>
                
                <Col>
                    {loadingLocation3 ? (
                        <Loader />
                    ) : errorLocation3 ? (
                        <Message variant='danger'>{errorLocation3}</Message>
                    ) : (
                        <FoodTable location={location3} foods={filterPrices(location3Prices)} priceString={"Price"}/>
                    )}
                </Col>
    
            </Row>
    
        </Container>
    );
}
export default HomeScreen;