import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown} from 'react-bootstrap';
import FoodTable from './FoodTable';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { listLocations } from '../actions/locationsActions';
import { listRegion1Prices, listRegion2Prices} from '../actions/regionalPriceActions';
import SelectRegionForm from './selectRegionForm';

import Loader from './Loader';
import Message from './Message';

const RegionalPriceScreen = () => {

    const dispatch = useDispatch();

    const locationList = useSelector((state) => state.locationList);
    const { loading, error, locations } = locationList;


    const region1PriceList = useSelector((state) => state.region1PriceList);
    const { loadingRegion1, errorRegion1, region1AvgPrices } = region1PriceList;

    const region2PriceList = useSelector((state) => state.region2PriceList);
    const { loadingRegion2, errorRegion2, region2AvgPrices } = region2PriceList;

    const [chain1, setChain1] = useState('');

    const chains = ['Jimmy Johns', 'FireHouse Subs', 'Jersey Mike\'s']

    const [location1, setLocation1] = useState('');
    const [location2, setLocation2] = useState('');

    const mapping = [{name: 'Jimmy Johns', type:'john'},
                    {name: 'FireHouse Subs', type:'fire'},
                    {name: 'Jersey Mike\'s', type:'mike'}]

    
   const updateLocation1 = (location) => {
        setLocation1(location);
        const city = location.split(', ')[0];
        const state = location.split(', ')[1];
        let locationsInCity = findLocationsInCity(chain1, city, state);
        console.log(locationsInCity)
        dispatch(listRegion1Prices(locationsInCity));
    }

    const updateLocation2 = (location) => {
        setLocation2(location);
        const city = location.split(', ')[0];
        const state = location.split(', ')[1];
        let locationsInCity = findLocationsInCity(chain1, city, state);
        console.log(locationsInCity);
        dispatch(listRegion2Prices(locationsInCity));
    }

    function findLocationsInCity(chain, city, state){
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
            let locationsInCity = locations.filter(x => x.type === type && x.city === city && x.state === state);
            return locationsInCity;
        }
    }

    function filterCities(chain){
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
            
            let uniqueCities = [...new Map(filteredLocations.map(x => [x.city, x])).values()]
            uniqueCities.sort((c1, c2) => (c1.city < c2.city) ? -1 : (c1.city > c2.city) ? 1 : 0);
            return uniqueCities;
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
            </Row>
    
    
            <Row>
    
            <Col>
                <SelectRegionForm cities={filterCities(chain1)}
                                    updateLocation={updateLocation1}
                                    />
                </Col>

                <Col>
                <SelectRegionForm cities={filterCities(chain1)}
                                    updateLocation={updateLocation2}
                                    />
                </Col>

            </Row>
                
            <Row>
                <Col>
                    {loadingRegion1 ? (
                        <Loader />
                    ) : errorRegion1 ? (
                        <Message variant='danger'>{errorRegion1}</Message>
                    ) : (
                        <FoodTable location={location1} foods={region1AvgPrices} priceString={"Average Price"}/>
                    )}
                </Col>
    
                <Col>
                    {loadingRegion2 ? (
                        <Loader />
                    ) : errorRegion2 ? (
                        <Message variant='danger'>{errorRegion2}</Message>
                    ) : (
                        <FoodTable location={location2} foods={region2AvgPrices} priceString={"Average Price"}/>
                    )}
                </Col>
    
            </Row>
    
        </Container>
    );
}
export default RegionalPriceScreen;