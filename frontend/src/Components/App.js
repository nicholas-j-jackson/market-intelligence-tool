import React from 'react';
import { Container, NavItem} from 'react-bootstrap';
import axios from 'axios';
import {Row, Col, Form} from 'react-bootstrap';

import FoodTable from './FoodTable';
import SelectRestaurantForm from './selectRestaurantForm';
import Header from './Header';


class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      locations: [],

        mapping: [{name: 'Jimmy Johns', type:'john'},
                    {name: 'FireHouse Subs', type:'fire'},
                    {name: 'Jersey Mike\'s', type:'mike'}],

        foods: [],

        chain1: 'Jimmy Johns',
        chain2: 'FireHouse Subs',
        chain3: 'Jersey Mike\'s',
        chains: ['Jimmy Johns', 'FireHouse Subs', 'Jersey Mike\'s'],

        location1: '',
        location2: '',
        location3: '',

        location1Foods: [],
        location2Foods: [],
        location3Foods: [],


    }

    this.updateLocation1 = this.updateLocation1.bind(this);
    this.updateLocation2 = this.updateLocation2.bind(this);
    this.updateLocation3 = this.updateLocation3.bind(this);
    
  }

    updateLocation1 = (location) => {
        this.setState({location1: location});
    
        let type = this.state.mapping.find(x => x.name === this.state.chain1).type;
        let newLocation = this.state.locations.find(x => x.address === location.split(',')[0]);
        const url = `http://localhost:3001/api/prices/type_id/${type}/` + newLocation.store_id;
        axios.get(url,).then(response => response.data)
        .then((data) => {
            this.setState({ location1Foods: data })
            //console.log(this.state.location1Foods)
        })

    }

    updateLocation2 = (location) => {
        this.setState({location2: location});

        let type = this.state.mapping.find(x => x.name === this.state.chain2).type;
        let newLocation = this.state.locations.find(x => x.address === location.split(',')[0]);
        const url = `http://localhost:3001/api/prices/type_id/${type}/` + newLocation.store_id;
        axios.get(url,).then(response => response.data)
        .then((data) => {
            this.setState({ location2Foods: data })
            //console.log(this.state.location2Foods)
        })

    }

    updateLocation3 = (location) => {
        this.setState({location3: location});

        let type = this.state.mapping.find(x => x.name === this.state.chain1).type;
        let newLocation = this.state.locations.find(x => x.address === location.split(',')[0]);
        const url = `http://localhost:3001/api/prices/type_id/${type}/` + newLocation.store_id;
        axios.get(url,).then(response => response.data)
        .then((data) => {
            this.setState({ location3Foods: data })
            //console.log(this.state.location1Foods)
        })

    }



  componentDidMount() {
      const url = 'http://localhost:3001/api/locations/state/FL';
      axios.get(url,).then(response => response.data)
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
            <SelectRestaurantForm locations={this.state.locations.filter(location => location.type === (this.state.mapping.filter(mapping => mapping.name === this.state.chain1).map(mapping => mapping.type)[0]))}
                                    chains={this.state.chains}
                                    chain={this.state.chain1}
                                    updateLocation={this.updateLocation1}
                                    location={this.state.location1}
                                    />

            </Col>

            <Col>
            <SelectRestaurantForm locations={this.state.locations.filter(location => location.type === (this.state.mapping.filter(mapping => mapping.name === this.state.chain2).map(mapping => mapping.type)[0]))}
                                    chains={this.state.chains}
                                    chain={this.state.chain2}
                                    updateLocation={this.updateLocation2}
                                    location={this.state.location2}
                                    />
            </Col>

            <Col>
            <SelectRestaurantForm locations={this.state.locations.filter(location => location.type === (this.state.mapping.filter(mapping => mapping.name === this.state.chain3).map(mapping => mapping.type)[0]))}
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
                            foods={this.state.location1Foods}
                />
            </Col>

            <Col>
                <FoodTable location={this.state.location2}
                            foods={this.state.location2Foods}
                />
            </Col>
            
            <Col>
            <FoodTable location={this.state.location3}
                        foods={this.state.location3Foods}
            />
            </Col>

        </Row>

        
    </Container>

    );
} 
}


export default App;