import axios from 'axios';


export const listLocations = () => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATIONS_LIST_REQUEST' });
        const { data } = await axios.get('http://localhost:3001/api/locations/state/FL');
        dispatch({ type: 'LOCATIONS_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATIONS_LIST_FAIL', payload: error.message });
    }
};

export const listLocationsByTypeAndState = (type, state) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATIONS_LIST_REQUEST' });
        const { data } = await axios.get('http://localhost:3001/api/locations/type_state/'+type+'/'+state);
        dispatch({ type: 'LOCATIONS_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATIONS_LIST_FAIL', payload: error.message });
    }
}

export const listLocationsByCityAndState = (city, state) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATIONS_LIST_REQUEST' });
        const { data } = await axios.get('http://localhost:3001/api/locations/city_state/'+city+'/'+state);
        dispatch({ type: 'LOCATIONS_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATIONS_LIST_FAIL', payload: error.message });
    }
}