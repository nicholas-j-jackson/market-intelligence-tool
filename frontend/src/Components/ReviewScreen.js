import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown} from 'react-bootstrap';
import Header from './Header';
import FoodTable from './FoodTable';
import SelectRestaurantForm from './selectRestaurantForm';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';

import { listLocations } from '../actions/locationsActions';
import { listReviewsByBizID } from '../actions/reviewActions';

import Loader from './Loader';
import Message from './Message';

import ComplexSelectRestaurantForm from './ComplexSelectRestaurantForm';
import ReviewBox from './ReviewBox';
import { listRestaurantsByCity } from '../actions/restaurantActions';

import Button from 'react-bootstrap/Button';
import { set } from 'mongoose';

// TODO: 
// Keep track of page number and index
// Update page nubmer and index when user clicks next or previous
// Reset page number and index when user selects a new restaurant
// Update reviews when user selects a new restaurant or clicks next or previous

const ReviewScreen = () => {
    const dispatch = useDispatch();

    const [rest, setRest] = useState("FxF6UvBIWWEGiu45Bk0teg");

    const [chain1, setChain1] = useState('Wendy\'s');
    const chains = ['Wendy\'s']; 

    const [city, setCity] = useState('Miami, FL');
    const cities = ['Albuquerque, NM', 'Amarillo, TX', 'Anaheim, CA', 'Anchorage, AK', 'Arlington, TX', 'Arlington, VA', 'Atlanta, GA', 'Augusta, GA', 'Aurora, CO', 'Austin, TX', 'Bakersfield, CA', 'Baltimore, MD', 'Baton Rouge, LA', 'Boise, ID', 'Boston, MA', 'Buffalo, NY', 'Cape Coral, FL', 'Chandler, AZ', 'Charlotte, NC', 'Chesapeake, VA', 'Chicago, IL', 'Chula Vista, CA', 'Cincinnati, OH', 'Cleveland, OH', 'Colorado Springs, CO', 'Columbus, GA', 'Columbus, OH', 'Corpus Christi, TX', 'Dallas, TX', 'Denver, CO', 'Des Moines, IA', 'Detroit, MI', 'Durham, NC', 'El Paso, TX', 'Enterprise, NV', 'Fayetteville, NC', 'Fontana, CA', 'Fort Wayne, IN', 'Fort Worth, TX', 'Fremont, CA', 'Fresno, CA', 'Frisco, TX', 'Garland, TX', 'Gilbert, AZ', 'Glendale, AZ', 'Grand Prairie, TX', 'Grand Rapids, MI', 'Greensboro, NC', 'Henderson, NV', 'Hialeah, FL', 'Honolulu, HI', 'Houston, TX', 'Huntington Beach, CA', 'Huntsville, AL', 'Indianapolis, IN', 'Irvine, CA', 'Irving, TX', 'Jacksonville, FL', 'Jersey City, NJ', 'Kansas City, MO', 'Laredo, TX', 'Las Vegas, NV', 'Lexington, KY', 'Lincoln, NE', 'Little Rock, AR', 'Long Beach, CA', 'Los Angeles, CA', 'Louisville, KY', 'Lubbock, TX', 'Madison, WI', 'McKinney, TX', 'Memphis, TN', 'Mesa, AZ', 'Miami, FL', 'Milwaukee, WI', 'Minneapolis, MN', 'Modesto, CA', 'Montgomery, AL', 'Moreno Valley, CA', 'Nashville, TN', 'New Orleans, LA', 'New York City, NY', 'Newark, NJ', 'Norfolk, VA', 'North Las Vegas, NV', 'Oakland, CA', 'Oklahoma City, OK', 'Omaha, NE', 'Orlando, FL', 'Overland Park, KS', 'Oxnard, CA', 'Peoria, AZ', 'Philadelphia, PA', 'Phoenix, AZ', 'Pittsburgh, PA', 'Plano, TX', 'Port St. Lucie, FL', 'Portland, OR', 'Raleigh, NC', 'Reno, NV', 'Richmond, VA', 'Riverside, CA', 'Rochester, NY', 'Sacramento, CA', 'Salt Lake City, UT', 'San Antonio, TX', 'San Bernardino, CA', 'San Diego, CA', 'San Francisco, CA', 'San Jose, CA', 'San Juan, PR', 'Santa Ana, CA', 'Santa Clarita, CA', 'Scottsdale, AZ', 'Seattle, WA', 'Sioux Falls, SD', 'Spokane, WA', 'Spring Valley, NV', 'St. Louis, MO', 'St. Paul, MN', 'St. Petersburg, FL', 'Stockton, CA', 'Sunrise Manor, NV', 'Tacoma, WA', 'Tallahassee, FL', 'Tampa, FL', 'Toledo, OH', 'Tucson, AZ', 'Tulsa, OK', 'Vancouver, WA', 'Virginia Beach, VA', 'Washington, DC', 'Wichita, KS', 'Winston-Salem, NC', 'Worcester, MA', 'Yonkers, NY']
    const restaurantList = useSelector((state) => state.restaurantList);
    const { loading, error, restaurants } = restaurantList;


    const reviewList = useSelector((state) => state.reviewList);
    const { loadingReviews, errReviews, reviews } = reviewList;


    const [index, setIndex] = useState(0);

    const [seed, setSeed] = useState(0);
    const [display, setDisplay] = useState(false);


    const [pageNumber, setPageNumber] = useState(0);
    const incrementPageNumber = () => {

        
        if (reviews.length < 9 + index) {
            return;
        }

        setPageNumber(pageNumber + 1);
        setIndex(index + 9);


    }

    const decrementPageNumber = () => {
        
        if (index === 0) {
            return;
        }

        setPageNumber(pageNumber - 1);
        setIndex(index - 9);
        
    }


    const changeRestaurant = (rest1) => {
        let bizID = restaurants.filter((restaurant) => restaurant.address === rest1.split(',')[0])[0].bizId;

        
        setRest(bizID);
        setPageNumber(0);
        setIndex(0);
        dispatch(listReviewsByBizID(bizID));

        setDisplay(true);
    }

    const updateCity = (city) => {
        setCity(city);
        setPageNumber(0);
        setIndex(0);
        dispatch(listRestaurantsByCity(city));
        
        setRest('');

        //updateReviewsToDisplay(rest1);
    }

    useEffect(() => {

        dispatch(listRestaurantsByCity(city));
        //dispatch(listReviewsByCity(city));
        dispatch(listReviewsByBizID(city, rest));


    }, [dispatch]);



    return (
        <Container fluid expand="xl">
            <Row>

                <Col>
                    <Form> 
                        <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Select Chain to Compare</Form.Label>
                        <Form.Control as="select" custom onChange={e => setChain1(e.target.value)} defaultValue={"chain1"}>
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
                        <Form.Label>Select City</Form.Label>
                        <Form.Control as="select" custom onChange={e => updateCity(e.target.value)} defaultValue={city}>
                            {cities.map((chain) => (
                                <option>{chain}</option>
                            ))}
                            
                        </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col/>

            </Row>

            <Row>
                <ComplexSelectRestaurantForm locations={restaurants}
                                    chains={chains}
                                    chain={chain1}
                                    updateLocation={changeRestaurant}
                                    location={rest}
                                    display={display}
                                    />

            </Row>

            { loadingReviews ? <Loader /> : errReviews ? <Message variant='danger'>{errReviews}</Message>: !display ? <div></div> : (reviews == undefined || reviews.length == 0) ? <Loader/> : //<Message variant='danger'>Select a location</Message>:
            <Container fluid expand='xl' key={seed}>
            <Row>
                <Col width='100%'>
                    {reviews[index+0] == undefined ? <Message variant='danger'>No reviews for this location</Message> : <ReviewBox review={reviews} index={index+0}/>}
                </Col>

                <Col>
                    { reviews[index+1] == undefined ? <div/> : <ReviewBox review={reviews} index={index+1}/>}
                </Col>
                
                <Col>
                    { reviews[index+2] == undefined ? <div/> : <ReviewBox review={reviews} index={index+2}/>}
                </Col>
            </Row>

            <Row>
                <Col>
                { reviews[index+3] == undefined ? <div/> : <ReviewBox review={reviews} index={index+3}/>}
                </Col>

                <Col>
                { reviews[index+4] == undefined ? <div/> : <ReviewBox review={reviews} index={index+4}/>}
                </Col>
                
                <Col>
                { reviews[index + 5] == undefined ? <div/> : <ReviewBox review={reviews} index={index + 5}/>}
                </Col>
            </Row>

            <Row>
                <Col>
                { reviews[index + 6] == undefined ? <div/> : <ReviewBox review={reviews} index={index + 6}/>}
                </Col>

                <Col>
                { reviews[index + 7] == undefined ? <div/> : <ReviewBox review={reviews} index={index + 7}/>}
                </Col>
                
                <Col>
                { reviews[index + 8] == undefined ? <div/> : <ReviewBox review={reviews} index={index + 8}/>}
                </Col>
            </Row>
                

            <Row>
                <Button onClick={decrementPageNumber} disabled={pageNumber == 0}> Previous</Button>
                <Button onClick={incrementPageNumber} disabled={reviews.length<9+index}>Next</Button>
                </Row>

            </Container>
            }



        </Container>
    )

    

    }

export default ReviewScreen


/*
            <Row>
                <Col>
                    <ReviewBox review={reviews[index+0]}/>
                </Col>

                <Col>
                    <ReviewBox review={reviews[index+1]}/>
                </Col>
                
                <Col>
                    <ReviewBox review={reviews[index+2]}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ReviewBox review={reviews[index+3]}/>
                </Col>

                <Col>
                    <ReviewBox review={reviews[index+4]}/>
                </Col>
                
                <Col>
                    <ReviewBox review={reviews[index+5]}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ReviewBox review={reviews[index+6]}/>
                </Col>

                <Col>
                    <ReviewBox review={reviews[index+7]}/>
                </Col>
                
                <Col>
                    <ReviewBox review={reviews[index+8]}/>
                </Col>
            </Row>
*/