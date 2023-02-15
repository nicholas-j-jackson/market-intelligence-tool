import {addNewLocation, getLocations, getLocationByStoreNumber} from '../controllers/locationControllers.js'

const locationRoutes = (app) => {
    app.route('/locations')
        // GET endpoint
        .get(getLocations)
    
        // POST Endpoint
            .post(addNewLocation);

    app.route('/locations/:store_number')
        .get(getLocationByStoreNumber);
    
}

export default locationRoutes;