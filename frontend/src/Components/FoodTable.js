import {Table } from 'react-bootstrap';


const FoodTable = (props) => {
    return (

        <Table striped bordered hover responsive>

            <thead>
                <tr>
                    <th width='40%'>Item</th>
                    <th width='30%'>Size</th>
                    <th width='30%'>Price</th>
                </tr>
            </thead>

            <tbody>
                {props.foods.map((food) => {
                    if (food.address ===  props.location.split(', ')[1])
                    {
                        return (
                        <tr>
                            <td width='40%'> {food.name}</td>
                            <td width='30%'> {food.size} </td>
                            <td width='30%'> {food.price}</td>

                        </tr>
                        )
                    }
                    
                })}        
            </tbody>

        </Table>
    )
};

export default FoodTable;
