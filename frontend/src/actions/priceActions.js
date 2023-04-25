import axios from 'axios';


// List all prices for a specific store by making a GET request to the backend
export const listLocation1Prices = (store_type, store_id) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATION1_PRICE_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/prices/type_id/${store_type}/${store_id}`);
        const sortedData = sortPrices(data);
        dispatch({ type: 'LOCATION1_PRICE_LIST_SUCCESS', payload: sortedData });
    } catch (error) {
        dispatch({ type: 'LOCATION1_PRICE_LIST_FAIL', payload: error.message });
    }
};

// List all prices for a specific store by making a GET request to the backend
export const listLocation2Prices = (store_type, store_id) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATION2_PRICE_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/prices/type_id/${store_type}/${store_id}`);
        const sortedData = sortPrices(data);
        dispatch({ type: 'LOCATION2_PRICE_LIST_SUCCESS', payload: sortedData });
    } catch (error) {
        dispatch({ type: 'LOCATION2_PRICE_LIST_FAIL', payload: error.message });
    }
}

// List all prices for a specific store by making a GET request to the backend
export const listLocation3Prices = (store_type, store_id) => async (dispatch) => {
    try {
        dispatch({ type: 'LOCATION3_PRICE_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/prices/type_id/${store_type}/${store_id}`);
        const sortedData = sortPrices(data);
        dispatch({ type: 'LOCATION3_PRICE_LIST_SUCCESS', payload: sortedData });
    } catch (error) {
        dispatch({ type: 'LOCATION3_PRICE_LIST_FAIL', payload: error.message });
    }
}

// A utility function to sort the prices by item and size
const sortPrices = (data) => {
    return data.sort((p1, p2) => {
        if (p1.item === p2.item) {
            return p1.size < p2.size ? -1 : 1
        }
        else {
            return p1.item < p2.item ? -1 : 1
        }
    });
}