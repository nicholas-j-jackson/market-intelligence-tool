import {addNewRestaurant, getRestaurants, getRestaurantWithID} from '../controllers/restaurantControllers.js'

const restaurantRoutes = (app) => {
    app.route('/locations')
        // GET endpoint
        .get(getRestaurants)
    
        // POST Endpoint
            .post(addNewRestaurant);

    app.route('/locations/:RestaurantId')
        .get(getRestaurantWithID);

}

export default restaurantRoutes;