import Form from 'react-bootstrap/Form';
import React from 'react';

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
                <Form.Control as="select" custom onChange={e => this.props.setUserCity(e.target.value)}>
                    {this.props.cities.map((city) => {
                         return <option>{city}</option>
                    })
                    }
                </Form.Control>
            </Form.Group>

        </Form>
    )

    }

    
};


export default SelectRegionForm;