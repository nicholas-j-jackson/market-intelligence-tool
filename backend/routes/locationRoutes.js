import {addNewLocation, getLocations, getLocationByTypeAndStoreNumber} from '../controllers/locationControllers.js'

const locationRoutes = (app) => {
    app.route('/locations')
        // GET endpoint
        .get(getLocations)
    
        // POST Endpoint
            .post(addNewLocation);

    app.route('/locations/:type/:store_number')
        .get(getLocationByTypeAndStoreNumber);
    
}

export default locationRoutes;