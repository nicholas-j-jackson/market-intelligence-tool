import {addNewRestaurant, getRestaurants, getRestaurantWithID} from '../controllers/restaurantControllers.js'

const locationRoutes = (app) => {
    app.route('/locations')
        // GET endpoint
        .get(getRestaurants)
    
        // POST Endpoint
            .post(addNewRestaurant);

    app.route('/locations/:RestaurantId')
        .get(getRestaurantWithID);

}

export default locationRoutes;