import React from 'react';
import { Container, NavItem} from 'react-bootstrap';
import axios from 'axios';
import {Row, Col, Form} from 'react-bootstrap';

import FoodTable from './FoodTable';
import SelectRestaurantForm from './selectRestaurantForm';
import Header from './Header';
import HomeScreen from './HomeScreen';


class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      locations: [{name: 'Jimmy Johns', address: '1234 Main St', city: 'Orlando', state: 'FL', zip: '32801', type:'john'},
                  {name: 'Jimmy Johns', address: '5689 Main St', city: 'Orlando', state: 'FL', zip: '32801', type:'john'},
                  {name: 'Jimmy Johns', address: '1496 4th St', city: 'Orlando', state: 'FL', zip: '32801', type:'john'},
                  {name: 'FireHouse Subs', address: '6789 Main St', city: 'Orlando', state: 'FL', zip: '32801', type:'fire'},
                  {name: 'FireHouse Subs', address: '0871 8th St', city: 'Orlando', state: 'FL', zip: '32801', type:'fire'},
                  {name: 'FireHouse Subs', address: '456789 Ave', city: 'Orlando', state: 'FL', zip: '32801', type:'fire'},
                  {name: 'Jersey Mike\'s', address: '1298 Main St', city: 'Orlando', state: 'FL', zip: '32801', type:'mike'},
                  {name: 'Jersey Mike\'s', address: '4321 Main St', city: 'Orlando', state: 'FL', zip: '32801', type:'mike'},
                  {name: 'Jersey Mike\'s', address: '0001 Main St', city: 'Orlando', state: 'FL', zip: '32801', type:'mike'},
                ],

        foods: [{name: 'Turkey', size: '6 inch', price: '$5.00', address: '1234 Main St'},
                {name: 'Ham', size: '6 inch', price: '$5.00', address: '1234 Main St'},
                {name: 'Roast Beef', size: '6 inch', price: '$5.00', address: '1234 Main St'},
                {name: 'Turkey', size: '12 inch', price: '$7.00', address: '1234 Main St'},
                {name: 'Ham', size: '12 inch', price: '$7.00', address: '5689 Main St'},
                {name: 'Roast Beef', size: '12 inch', price: '$7.00', address: '1496 4th St'},
                {name: 'Turkey', size: '6 inch', price: '$5.00', address: '6789 Main St'},
                {name: 'Ham', size: '6 inch', price: '$5.00', address: '6789 Main St'},
                {name: 'Roast Beef', size: '6 inch', price: '$5.00', address: '6789 Main St'},
                {name: 'Turkey', size: '12 inch', price: '$7.00', address: '6789 Main St'},
                {name: 'Ham', size: '12 inch', price: '$7.00', address: '0871 8th St'},
                {name: 'Roast Beef', size: '12 inch', price: '$7.00', address: '456789 Ave'},
                {name: 'Turkey', size: '6 inch', price: '$5.00', address: '1298 Main St'},
                {name: 'Ham', size: '6 inch', price: '$5.00', address: '1298 Main St'},
                {name: 'Roast Beef', size: '6 inch', price: '$5.00', address: '1298 Main St'},
                {name: 'Turkey', size: '12 inch', price: '$7.00', address: '4321 Main St'},
                {name: 'Ham', size: '12 inch', price: '$7.00', address: '4321 Main St'},
                {name: 'Roast Beef', size: '12 inch', price: '$7.00', address: '0001 Main St'},
            ],



        chain1: 'Jimmy Johns',
        chain2: 'Jimmy Johns',
        chain3: 'FireHouse Subs',
        chains: ['Jimmy Johns', 'FireHouse Subs', 'Jersey Mike\'s'],

        location1: '',
        location2: '',
        location3: ''

    }

    this.updateLocation1 = this.updateLocation1.bind(this);
    this.updateLocation2 = this.updateLocation2.bind(this);
    this.updateLocation3 = this.updateLocation3.bind(this);
    
  }

    updateLocation1 = (location) => {
        this.setState({location1: location});
    }

    updateLocation2 = (location) => {
        this.setState({location2: location});
    }

    updateLocation3 = (location) => {
        this.setState({location3: location});
    }



  componentDidMount() {
      const url = 'http://localhost:3001/api/locations/state/FL';
      axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ locations: data })
        console.log(this.state.locations)
      })
      .catch((error) => {
        console.log(error);
      });
  }



  render() {
    return (
      <Container fluid expand="xl">

        <Header />

        <Row>
            <Col>
            <Form> 
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Chain to Compare</Form.Label>
                <Form.Control as="select" custom onChange={e => this.setState({chain1: e.target.value})}>
                    {this.state.chains.map((chain, index) => {
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
                <Form.Control as="select" custom onChange={e => this.setState({chain2: e.target.value})}>
                    {this.state.chains.map((chain, index) => {
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
                <Form.Control as="select" custom onChange={e => this.setState({chain3: e.target.value})}>
                    {this.state.chains.map((chain, index) => {
                        return <option key={index}>{chain}</option>
                    })}
                    </Form.Control>
                </Form.Group>
            </Form>
            </Col>
        </Row>


        <Row>

            <Col>
            <SelectRestaurantForm locations={this.state.locations.filter(location => location.name == this.state.chain1)}
                                    chains={this.state.chains}
                                    chain={this.state.chain1}
                                    updateLocation={this.updateLocation1}
                                    location={this.state.location1}
                                    />

            </Col>

            <Col>
            <SelectRestaurantForm locations={this.state.locations.filter(location => location.name == this.state.chain2)}
                                    chains={this.state.chains}
                                    chain={this.state.chain2}
                                    updateLocation={this.updateLocation2}
                                    location={this.state.location2}
                                    />
            </Col>

            <Col>
            <SelectRestaurantForm locations={this.state.locations.filter(location => location.name == this.state.chain3)}
                                    chains={this.state.chains}
                                    chain={this.state.chain3}
                                    updateLocation={this.updateLocation3}
                                    location={this.state.location3}
                                    />
            </Col>

        </Row>
            
        <Row>
            <Col>
                <FoodTable location={this.state.location1} 
                            foods={this.state.foods}
                />
            </Col>

            <Col>
                <FoodTable location={this.state.location2}
                            foods={this.state.foods}
                />
            </Col>
            
            <Col>
            <FoodTable location={this.state.location3}
                        foods={this.state.foods}
            />
            </Col>

        </Row>




        
    </Container>

    );
} 
}


export default App;