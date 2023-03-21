import {getRestaurantByCity} from '../controllers/reviewControllers.js'

const restaurantroutes = (app) => {
    
    // Create route to get all reviews for a specific city
    app.route('/restaurants/city/:city')
        .get(getRestaurantByCity)
    

    app.route('/restaurants/bizId/:bizId')
        .get(getRestaurantBybizId);

    // There is no POST Endpoint as all data is added by the admin
}

export default restaurantroutes;