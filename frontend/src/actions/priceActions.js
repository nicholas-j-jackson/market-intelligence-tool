import axios from 'axios';



export const listLocation1Prices = (store_type, store_id) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATION1_PRICE_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/prices/type_id/${store_type}/${store_id}`);
        dispatch({ type: 'LOCATION1_PRICE_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATION1_PRICE_LIST_FAIL', payload: error.message });
    }
};

export const listLocation2Prices = (store_type, store_id) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATION2_PRICE_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/prices/type_id/${store_type}/${store_id}`);
        dispatch({ type: 'LOCATION2_PRICE_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATION2_PRICE_LIST_FAIL', payload: error.message });
    }
}

export const listLocation3Prices = (store_type, store_id) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATION3_PRICE_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/prices/type_id/${store_type}/${store_id}`);
        dispatch({ type: 'LOCATION3_PRICE_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOCATION3_PRICE_LIST_FAIL', payload: error.message });
    }
}