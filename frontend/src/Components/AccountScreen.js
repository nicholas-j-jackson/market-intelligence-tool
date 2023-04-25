import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { sessionService } from 'redux-react-session';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import { useDispatch, useSelector } from 'react-redux';
import { listLocationsByCityAndState } from '../actions/locationsActions';

import { listLocation1Prices, listLocation2Prices, listLocation3Prices } from '../actions/priceActions';

import {Form } from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';

import FoodTable from './FoodTable';
import SelectCompetitorForm from './SelectCompetitorForm';

import Loader from './Loader';

import './LoginScreen.css'

const HERE_API_KEY = 'EOCZRVAhmNCHpc7ze6ortW5m3BhO9t7I0blnnPqvhUM' //process.env.HERE_APIKEY;


const AccountScreen = () => {  

    // Create local state variables to store user attributes
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [location, setLocation] = useState("");
    const [location2, setLocation2] = useState("");
    const [location3, setLocation3] = useState("");

    const [maxPrice, setMaxPrice] = useState(100);
    const [minPrice, setMinPrice] = useState(0);

    const [userLat, setUserLat] = useState(0);
    const [userLong, setUserLong] = useState(0);
    
    const [location1RestType, setLocation1RestType] = useState("");
    const [location2RestType, setLocation2RestType] = useState("");
    const [location3RestType, setLocation3RestType] = useState("");


    // Load in values from the redux store
    const location1PriceList = useSelector((state) => state.location1PriceList);
    const { loadingLocation1, errorLocation1, location1Prices } = location1PriceList;

    const location2PriceList = useSelector((state) => state.location2PriceList);
    const { loadingLocation2, errorLocation2, location2Prices } = location2PriceList;

    const location3PriceList = useSelector((state) => state.location3PriceList);
    const { loadingLocation3, errorLocation3, location3Prices } = location3PriceList;
    
    // Define a constant to convert between type and restaurant name
    const mapping = [{name: 'Jimmy Johns', type:'john'},
    {name: 'FireHouse Subs', type:'fire'},
    {name: 'Jersey Mike\'s', type:'mike'}]

    // A function to filter prices (sort them, remove duplicates, and remove non-ASCII characters)
    function filterPrices(locationPrices){
      
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


      // Sort by price
      filteredPrices.sort((a, b) => (a.price > b.price) ? 1 : -1);
      
      
      
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

      
      // Remove prices that are not in the range
      filteredPrices = filteredPrices.filter(x => parseFloat(x.price) >= minPrice);
      filteredPrices = filteredPrices.filter(x => parseFloat(x.price) <= maxPrice);

      return filteredPrices;
  }



    // Define the state variables used to store the user's selected food items
    function filterLocations(locs){
      // If no objects in locations or is undefined, return empty array
      if (locs === undefined || locs.length == 0){
          return [];
      }
      else{
          let filteredLocations = [...new Set(locs)]; // Remove duplicates

          // Remove locations which are not the selected location
          filteredLocations = filteredLocations.filter(x => x.address !== location.split(',')[0]);


          // Compute the distance between the user and each location
          if (userLat !== ''){
              filteredLocations = filteredLocations.map(x => {
                  x.distance = Math.round(distance(userLat, userLong, x.latitude, x.longitude, 'M') * 10) / 10;
                  return x;
              });
      
              filteredLocations.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
          }
          
          return filteredLocations;
      }
  }


  // A function to compute distance (in miles) between two latitude and longitude coordinates
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

    // A function to update the second location chosen to compare prices with
  function updateLocation2(e){
    setLocation2(e);

    // Find the type and id of the location
    let location_type = locations.filter(loc => loc.address === e.split(',')[0])[0].type;
    let location_id = locations.filter(loc => loc.address === e.split(',')[0])[0].store_id;

    // Update the restaurant type and refresh the prices
    setLocation2RestType(mapping.filter(x => x.type === location_type)[0].name)
    dispatch(listLocation2Prices(location_type, location_id));

    // Refresh the prices for the first location
    let location_type1 = locations.filter(loc => loc.address === location.split(',')[0])[0].type;
    let location_id1 = locations.filter(loc => loc.address === location.split(',')[0])[0].store_id;
    setLocation1RestType(mapping.filter(x => x.type === location_type1)[0].name)
    dispatch(listLocation1Prices(location_type1, location_id1));

  }

    // A function to update the third location chosen to compare prices with
  function updateLocation3(e){
    setLocation3(e);

    // Find the type and id of the location
    let location_type = locations.filter(loc => loc.address === e.split(',')[0])[0].type;
    let location_id = locations.filter(loc => loc.address === e.split(',')[0])[0].store_id;

    // Update the restaurant type and refresh the prices
    setLocation3RestType(mapping.filter(x => x.type === location_type)[0].name)
    dispatch(listLocation3Prices(location_type, location_id));

    // Refresh the prices for the first location
    let location_type1 = locations.filter(loc => loc.address === location.split(',')[0])[0].type;
    let location_id1 = locations.filter(loc => loc.address === location.split(',')[0])[0].store_id;
    setLocation1RestType(mapping.filter(x => x.type === location_type1)[0].name)
    dispatch(listLocation1Prices(location_type1, location_id1));
  }

    // Use dispatch
    const dispatch = useDispatch();

    // Get all locations from the redux store
    const locationList = useSelector(state => state.locationList);
    const { loading, error, locations } = locationList;

    // A function to update the user position
    function resetLocation(){
      if( location !== ''){
        let modifiedAddress = location.split(",")[0].replaceAll(" ", "+").replaceAll(",", "%2C").replaceAll(".", "%2E").replaceAll("#", "%23").replaceAll("&", "%26").replaceAll(":", "%3A");

        let URL = "https://geocode.search.hereapi.com/v1/geocode?q=" + modifiedAddress + "&limit=4&apiKey=" + HERE_API_KEY

        // Make a get request to the HERE API to get the user's coordinates
        axios.get(URL)
        .then(response => {
            setUserLong(response.data.items[0].position.lng);
            setUserLat(response.data.items[0].position.lat);
        })
    }

    }

    useEffect(()=>{

        // Load the user's session and get their information
        sessionService.loadSession().then(currentSession => {
          console.log(currentSession)
          axios.get('http://localhost:3001/api/users/id/'+currentSession)
            .then(res=> {
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setEmail(res.data.email);
                setUserName(res.data.username);
                setLocation(res.data.location);

                dispatch(listLocationsByCityAndState(res.data.location.split(", ")[1], res.data.location.split(", ")[2]));
            })
            .catch(err=>console.log(err))
        })
        .catch(err => {
          console.log(err)
         
        })


        // Get the user's location and update the user's position
        resetLocation();

      }, [dispatch])

      /*
      
        let location_type = locations.filter(loc => loc.address === location.split(',')[0])[0].type;
        let location_id = locations.filter(loc => loc.address === location.split(',')[0])[0].id;
        dispatch(listLocation1Prices(location_type, location_id));
      */


    return (
      <Container fluid expand='xl'>

        <Row>
          <Col/>
          <Col>
            <Card>
                <Card.Body>
                    <Card.Title>{firstName} {lastName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                    <Card.Text>
                        Username: {username}
                    </Card.Text>
                    <Card.Text>
                        Location: {location}
                    </Card.Text>
                    <Form> 
                      <ButtonGroup>
                          <Button variant="primary" onClick={e => resetLocation()}>Update Location</Button>
                      </ButtonGroup>

                    </Form>
                </Card.Body>
            </Card>
          </Col>
          <Col/>
        </Row>
      
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
          </Row>

      <Row>
        <Col>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Your Restaurant</Form.Label>
                    <Form.Control as="select"  disabled>
                    <option>{location}, ({location1RestType})</option>
                    </Form.Control>
                </Form.Group>
    
            </Form>
        </Col>

        <Col>
        {locations.length > 0 ? <SelectCompetitorForm locations={filterLocations(locations)} setLocation={updateLocation2} loc = {location2} mapping={mapping}/> : null}
        </Col>

        <Col>
        {locations.length > 0 ? <SelectCompetitorForm locations={filterLocations(locations)} setLocation={updateLocation3} loc = {location3} mapping={mapping}/> : null}
        </Col>


      </Row>

      

      <Row>

        <Col>
        {loadingLocation1 ? <Loader/> : location !== "" && location1Prices && location1Prices.length > 0 ?    <FoodTable location={location} foods={filterPrices(location1Prices)} priceString={"Price"}/> : null}
            </Col>
        <Col>
        {loadingLocation2 ? <Loader/> : location2 != ""  && location2Prices && location2Prices.length > 0?    <FoodTable location={location2} foods={filterPrices(location2Prices)} priceString={"Price"}/> : null}
            </Col>

        <Col>
        {loadingLocation3 ? <Loader/> : location3 != "" && location3Prices && location3Prices.length > 0 ?    <FoodTable location={location3} foods={filterPrices(location3Prices)} priceString={"Price"}/> : null}
            </Col>
      </Row>
      </Container>



    );
}
export default AccountScreen;