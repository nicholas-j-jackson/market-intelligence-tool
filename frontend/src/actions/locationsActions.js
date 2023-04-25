import axios from 'axios';

// List all locations by making a GET request to the backend
export const listLocations = () => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATIONS_LIST_REQUEST' });
        const { data } = await axios.get('http://localhost:3001/api/locations/state/FL');
        dispatch({ type: 'LOCATIONS_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATIONS_LIST_FAIL', payload: error.message });
    }
};

// List all locations of a specific chain within a specific state by making a GET request to the backend
export const listLocationsByTypeAndState = (type, state) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATIONS_LIST_REQUEST' });
        const { data } = await axios.get('http://localhost:3001/api/locations/type_state/'+type+'/'+state);
        dispatch({ type: 'LOCATIONS_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATIONS_LIST_FAIL', payload: error.message });
    }
}

// List all locations within a specific city and state by making a GET request to the backend
export const listLocationsByCityAndState = (city, state) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATIONS_LIST_REQUEST' });
        const { data } = await axios.get('http://localhost:3001/api/locations/city_state/'+city+'/'+state);
        dispatch({ type: 'LOCATIONS_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATIONS_LIST_FAIL', payload: error.message });
    }
}