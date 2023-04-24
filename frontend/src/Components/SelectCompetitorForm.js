import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from 'react';
import FoodTable from './FoodTable';
import Row from 'react-bootstrap/Row';

class SelectCompetitorForm extends React.Component {
    // Accept props from parent component
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Select Competitor</Form.Label>
                    <Form.Control as="select" custom onChange={e => this.props.setLocation(e.target.value)} defaultValue={this.props.loc}>
                        <option></option>
                        {this.props.locations.map((location) => {
                             return <option>{location.address}, {location.city}, {location.state}, ({this.props.mapping.filter(x => x.type === location.type)[0].name}), {location.distance} Miles Away</option>
                        })
                        }
                    </Form.Control>
                </Form.Group>
    
            </Form>
        )
    }
    
    
};


export default SelectCompetitorForm;