import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from 'react';
import FoodTable from './FoodTable';
import Row from 'react-bootstrap/Row';

class SelectRestaurantForm extends React.Component {
    // Accept props from parent component
    constructor(props) {
        super(props);
    }
    
    render(){
    return (
        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Restaurant</Form.Label>
                <Form.Control as="select" custom onChange={e => this.props.updateLocation(e.target.value)}>
                    {this.props.locations.map((location) => {
                         return <option>{location.name}, {location.address}</option>
                    })
                    }
                </Form.Control>
            </Form.Group>

        </Form>
    )
    }

    
};


export default SelectRestaurantForm;