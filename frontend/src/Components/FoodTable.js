import { Table, Button } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import React from 'react';


class FoodTable extends React.Component {
    // Accept props from parent component
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.getHeader = this.getHeader.bind(this);
    }

    getData() {
        return this.props.foods.map(({item, size, price}) => {return {
            item: item.toString(),
            size: size.toString(), price: price.toString()
        }
        });
    }

    getHeader() {
        return [
            { label: "Item", key: "item" },
            { label: "Size", key: "size" },
            { label: "Price", key: "price" }
          ];
    }

    render(){
        console.log(this.props.foods)

        return (
        <div>
            <CSVLink data={this.getData()} headers={this.getHeader()} filename="foods">
                <Button>DownLoad CSV</Button>
            </CSVLink>
        <Table striped bordered hover responsive>

            <thead>
                <tr>
                    <th width='40%'>Item</th>
                    <th width='30%'>Size</th>
                    <th width='30%'>{this.props.priceString}</th>
                </tr>
            </thead>

            <tbody>
                {this.props.foods.map((food) => {
                    return (
                        <tr>
                            <td width='40%'> {food.item}</td>
                            <td width='30%'> {food.size} </td>
                            {food.type == 'john' ? <td width='30%'> {food['price ']}</td> : 
                            <td width='30%'> {food.price}</td> 
                            }

                        </tr>
                        )                    
                })} 

            </tbody>

        </Table>
        </div>
    )}
};

export default FoodTable;
