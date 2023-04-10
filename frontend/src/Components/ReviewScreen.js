import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown} from 'react-bootstrap';
import Header from './Header';
import FoodTable from './FoodTable';
import SelectRestaurantForm from './selectRestaurantForm';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';

import { listLocations } from '../actions/locationsActions';
import { listReviewsByCity } from '../actions/reviewActions';

import Loader from './Loader';
import Message from './Message';

import ComplexSelectRestaurantForm from './ComplexSelectRestaurantForm';
import ReviewBox from './ReviewBox';
import { listRestaurantsByCity } from '../actions/restaurantActions';

import Button from 'react-bootstrap/Button';

// TODO: 
// Keep track of page number and index
// Update page nubmer and index when user clicks next or previous
// Reset page number and index when user selects a new restaurant
// Update reviewsToDisplay when user selects a new restaurant or clicks next or previous

const ReviewScreen = () => {
    const dispatch = useDispatch();

    const [rest1, setRest1] = useState('');

    const [chain1, setChain1] = useState('Wendy\'s');
    const chains = ['Wendy\'s']; 

    const restaurantList = useSelector((state) => state.restaurantList);
    const { loading, error, restaurants } = restaurantList;


    const reviewList = useSelector((state) => state.reviewList);
    const { loadingReviews, errReviews, reviews } = reviewList;


    const [reviewsToDisplay, setReviewsToDisplay] = useState([]);
    const [index, setIndex] = useState(0);


    const [pageNumber, setPageNumber] = useState(0);
    const incrementPageNumber = () => {
        setPageNumber(pageNumber + 1);
        setIndex(index + 9);
        updateReviewsToDisplay(rest1);
    }

    const decrementPageNumber = () => {
        setPageNumber(pageNumber - 1);
        setIndex(index - 9);
        updateReviewsToDisplay(rest1);
    }


    const updateReviewsToDisplay = (rest) => {
        setRest1(rest);
        // If reviews is undefined or empty, do nothing
        if (reviews) {
            setReviewsToDisplay(reviews.slice(index, Math.min(reviews.length, 9)))
        }
        console.log(reviewsToDisplay)
    }


    const changeRestaurant = (rest) => {
        setRest1(rest);
        setPageNumber(0);
        setIndex(0);
        updateReviewsToDisplay(rest);
    }

    useEffect(() => {
        dispatch(listRestaurantsByCity('Miami'));
        dispatch(listReviewsByCity('Miami'));

        updateReviewsToDisplay();
    }, [dispatch]);



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

                <Col/>
                <Col/>

            </Row>

            <Row>
                <ComplexSelectRestaurantForm locations={restaurants}
                                    chains={chains}
                                    chain={chain1}
                                    updateLocation={changeRestaurant}
                                    location={rest1}
                                    />
            </Row>

            { loadingReviews ? <Loader /> : errReviews ? <Message variant='danger'>{errReviews}</Message>:  (reviewsToDisplay.length == 0) ? <Message variant='danger'>Select a location</Message>:
            <Container>
            <Row>
                <Col>
                    <ReviewBox review={reviewsToDisplay} index={0}/>
                </Col>

                <Col>
                    <ReviewBox review={reviewsToDisplay} index={1}/>
                </Col>
                
                <Col>
                    <ReviewBox review={reviewsToDisplay} index={2}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ReviewBox review={reviewsToDisplay} index={3}/>
                </Col>

                <Col>
                    <ReviewBox review={reviewsToDisplay} index={4}/>
                </Col>
                
                <Col>
                    <ReviewBox review={reviewsToDisplay} index={5}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ReviewBox review={reviewsToDisplay} index={6}/>
                </Col>

                <Col>
                    <ReviewBox review={reviewsToDisplay} index={7}/>
                </Col>
                
                <Col>
                    <ReviewBox review={reviewsToDisplay} index={8}/>
                </Col>
            </Row>
                

            <Row>
                <Button onClick={decrementPageNumber}>Previous</Button>
                <Button onClick={incrementPageNumber}>Next</Button>
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