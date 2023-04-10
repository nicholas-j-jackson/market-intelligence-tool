import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Header from './Header';
import FoodTable from './FoodTable';
import SelectRestaurantForm from './selectRestaurantForm';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';

function HomeScreen(props) {

    return (
        <div>
        <Container fluid expand="xl">

        <Header />

        <Row>
            <Col>
            <Form> 
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Chain to Compare</Form.Label>
                <Form.Control as="select" custom onChange={e => props.updateChain1(e)}>
                    {props.chains.map((chain, index) => {
                        return <option key={index}>{chain}</option>
                    })}
                    
                    <option>{props.chain1}</option>

                    </Form.Control>
                </Form.Group>
            </Form>
            </Col>

            <Col>
            <Form> 
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Chain to Compare</Form.Label>
                <Form.Control as="select" custom onChange={e => props.updateChain2(e)}>
                    {props.chains.map((chain, index) => {
                        return <option key={index}>{chain}</option>
                    })}
                    </Form.Control>
                </Form.Group>
            </Form>
            </Col>

            <Col>
            <Form> 
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Chain to Compare</Form.Label>
                <Form.Control as="select" custom onChange={e => props.updateChain3(e)}>
                    {props.chains.map((chain, index) => {
                        return <option key={index}>{chain}</option>
                    })}
                    </Form.Control>
                </Form.Group>
            </Form>
            </Col>
        </Row>


        <Row>

            <Col>
            <SelectRestaurantForm/>
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
    </div>
    )
}

export default HomeScreen