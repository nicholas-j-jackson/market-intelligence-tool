import {Table } from 'react-bootstrap';
import React from 'react';


class FoodTable extends React.Component {
    // Accept props from parent component
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <div>
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
                            <td width='30%'> {food.price}</td>

                        </tr>
                        )                    
                })} 

            </tbody>

        </Table>
        </div>
    )}
};

export default FoodTable;
