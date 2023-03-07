import {addNewLocation, getLocations, getLocationByTypeAndStoreNumber, getLocationsByTypeAndState, getLocationsByState, getLocationsByZip} from '../controllers/locationControllers.js'

const locationRoutes = (app) => {
    app.route('/locations')
        // GET endpoint
        .get(getLocations)
    
        // POST Endpoint
            .post(addNewLocation);

    app.route('/locations/type_id/:type/:store_id')
        .get(getLocationByTypeAndStoreNumber);
    
    app.route('/locations/type_state/:type/:state')
        .get(getLocationsByTypeAndState);
    
    app.route('/locations/state/:state')
        .get(getLocationsByState);

    app.route('/locations/zip/:zip')
        .get(getLocationsByZip);
}

export default locationRoutes;