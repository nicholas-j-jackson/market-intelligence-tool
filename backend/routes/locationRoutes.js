import {addNewLocation, getLocations, getLocationByTypeAndStoreNumber, getLocationsByTypeAndState, getLocationsByState, getLocationsByZip} from '../controllers/locationControllers.js'

const locationRoutes = (app) => {
    app.route('/api/locations')
        // GET endpoint
        .get(getLocations)
    
        // POST Endpoint
            .post(addNewLocation);

    app.route('/api/locations/type_id/:type/:store_id')
        .get(getLocationByTypeAndStoreNumber);
    
    app.route('/api/locations/type_state/:type/:state')
        .get(getLocationsByTypeAndState);
    
    app.route('/api/locations/state/:state')
        .get(getLocationsByState);

    app.route('/api/locations/zip/:zip')
        .get(getLocationsByZip);
}

export default locationRoutes;