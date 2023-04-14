import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from 'react';
import FoodTable from './FoodTable';
import Row from 'react-bootstrap/Row';

class SelectRegionForm extends React.Component {
    // Accept props from parent component
    constructor(props) {
        super(props);
    }

    render(){
    return (
        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select City</Form.Label>
                <Form.Control as="select" custom onChange={e => this.props.updateLocation(e.target.value)}>
                    {this.props.cities.map((location) => {
                         return <option>{location.city}, {location.state}</option>
                    })
                    }
                </Form.Control>
            </Form.Group>

        </Form>
    )

    }

    
};


export default SelectRegionForm;