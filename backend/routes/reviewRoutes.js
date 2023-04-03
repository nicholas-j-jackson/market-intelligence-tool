import {getReviewsByCity, getReviewsBybizId} from '../controllers/reviewControllers.js'

const reviewRoutes = (app) => {

    // Create route to get all reviews for a specific city
    app.route('/reviews/city/:city')
        .get(getReviewsByCity)
    

    // Create route to get all reviews for a specific bizId
    app.route('/reviews/bizId/:bizId')
        .get(getReviewsBybizId);
    
    // There is no POST Endpoint as all data is added by the admin
   
}

export default reviewRoutes;