import {getRestaurantByCity, getRestaurantBybizId, getRestaurantByRestaurantName, getAllRestaurants} from '../controllers/restaurantControllers.js'



const restaurantRoutes = (app) => {
    
    // Create route to get all reviews for a specific city
    app.route('/api/restaurants/city/:city')
        .get(getRestaurantByCity)
    

    app.route('/api/restaurants/bizId/:bizId')
        .get(getRestaurantBybizId);


    app.route('/api/restaurants/restaurantName/:restaurantName')
        .get(getRestaurantByRestaurantName);
    // There is no POST Endpoint as all data is added by the admin

    app.route('/api/restaurants')
        .get(getAllRestaurants);
}

export default restaurantRoutes;