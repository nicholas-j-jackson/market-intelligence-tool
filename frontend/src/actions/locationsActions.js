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