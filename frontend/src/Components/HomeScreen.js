import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Header from './Header';
import FoodTable from './FoodTable';
import SelectRestaurantForm from './selectRestaurantForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

//import { listRestaurants, listNearbyRestaurants } from '../actions/restaurantActions';

import Form from 'react-bootstrap/Form';


const HomeScreen = () => {

    //const dispatch = useDispatch();

    //useEffect(() => {
    //   dispatch(listRestaurants());
    //}, [dispatch]);

    //const restaurantList = useSelector(state => state.restaurantList);
    //const { loading, error, restaurants } = restaurantList;




    return (
    <Container fluid expand="xl">
        <Header />

        <Row>
            <Col>
            <Form> 
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Chain to Compare</Form.Label>
                <Form.Control as="select" custom onChange={e => this.setState({restaurant1: e.target.value})}>
                    <option>Jimmy Johns</option>
                    <option>FireHouse Subs</option>
                    <option>Jersey Mike's</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            </Col>

            <Col>
            <Form> 
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Chain to Compare</Form.Label>
                <Form.Control as="select" custom onChange={e => this.setState({rest2: e.target.value})}>
                    <option>Jimmy Johns</option>
                    <option>FireHouse Subs</option>
                    <option>Jersey Mike's</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            </Col>

            <Col>
            <Form> 
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Chain to Compare</Form.Label>
                <Form.Control as="select" custom onChange={e => this.setState({rest3: e.target.value})}>
                    <option>Jimmy Johns</option>
                    <option>FireHouse Subs</option>
                    <option>Jersey Mike's</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            </Col>
        </Row>


        <Row>

            <Col>
            <SelectRestaurantForm />
            </Col>

            <Col>
            <SelectRestaurantForm />
            </Col>

            <Col>
            <SelectRestaurantForm />
            </Col>

        </Row>



        <Row>
            <Col>
            <FoodTable />

            </Col>

            <Col>
            <FoodTable />
            </Col>

            <Col>
            <FoodTable />
            </Col>

        </Row>
      
    </Container>

    )
}

export default HomeScreen