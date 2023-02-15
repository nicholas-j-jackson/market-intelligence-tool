import { addNewFood, getFoods, getFoodFromAddress, getFoodFromID, putFood, deleteFood } from '../controllers/foodControllers.js'

const routes = (app) => {
    // Add new food
    app.route('/food')
    // POST endpoint
        .post(addNewFood);

    // Get all foods
    app.route('/foods')
    // GET endpoint
        .get(getFoods);

    // Get food from address
    app.route('/food/:actual_address')
    // GET endpoint
        .get(getFoodFromAddress);

    // Get food from id
    app.route('/food/:id')
    // GET endpoint
        .get(getFoodFromID);

    // Update food
    app.route('/food/:id')
    // PUT endpoint
        .put(putFood);
    
    // Delete food  
    app.route('/food/:id')
    // DELETE endpoint
        .delete(deleteFood);

}

export default routes;
