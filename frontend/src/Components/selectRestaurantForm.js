import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect } from 'react';



const SelectRestaurantForm = () => {

    return (
        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Restaurant</Form.Label>
                <Form.Control as="select" custom>

                    <option>Restaurant 1</option>
                    <option>Restaurant 2</option>
                    <option>Restaurant 3</option>
                    <option>Restaurant 4</option>
                    <option>Restaurant 5</option>
                </Form.Control>
            </Form.Group>
        </Form>
    )
};


export default SelectRestaurantForm;