import {addNewLocation, getLocations, getLocationByTypeAndStoreNumber, getLocationsByTypeAndState, getLocationsByState, getLocationsByZip, getLocationsByTypeAndZip, getLocationsByTypeAndCityAndState, getLocationsByCityAndState} from '../controllers/locationControllers.js'

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

    app.route('/api/locations/type_zip/:type/:zip')
        .get(getLocationsByTypeAndZip);
    
    app.route('/api/locations/type_city_state/:type/:city/:state')
        .get(getLocationsByTypeAndCityAndState);

    app.route('/api/locations/state/:state')
        .get(getLocationsByState);

    app.route('/api/locations/zip/:zip')
        .get(getLocationsByZip);

    app.route('/api/locations/city_state/:city/:state')
        .get(getLocationsByCityAndState);
}

export default locationRoutes;