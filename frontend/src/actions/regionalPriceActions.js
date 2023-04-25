import axios from 'axios';

// List and aggregate all prices for a specific region by making a GET request to the backend
export const listRegion1Prices = (locations) => async (dispatch) => {
    try {
        dispatch({ type: 'REGION1_PRICE_LIST_REQUEST' });
        let concatData = [];
        for (let i = 0; i < locations.length; i++) {
            const store_type = locations[i].type;
            const store_id = locations[i].store_id;
            const { data } = await axios.get(`http://localhost:3001/api/prices/type_id/${store_type}/${store_id}`);
            concatData.push(data);
        }
        let payloadData = getAveragePrices(concatData);
        dispatch({ type: 'REGION1_PRICE_LIST_SUCCESS', payload: payloadData });
    } catch (error) {
        dispatch({ type: 'REGION1_PRICE_LIST_FAIL', payload: error.message });
    }
};

// List and aggregate all prices for a specific region by making a GET request to the backend
export const listRegion2Prices = (locations) => async (dispatch) => {
    try {
        dispatch({ type: 'REGION2_PRICE_LIST_REQUEST' });
        let concatData = [];
        for (let i = 0; i < locations.length; i++) {
            const store_type = locations[i].type;
            const store_id = locations[i].store_id;
            const { data } = await axios.get(`http://localhost:3001/api/prices/type_id/${store_type}/${store_id}`);
            concatData.push(data);
        }
        let payloadData = getAveragePrices(concatData);
        dispatch({ type: 'REGION2_PRICE_LIST_SUCCESS', payload: payloadData });
    } catch (error) {
        dispatch({ type: 'REGION2_PRICE_LIST_FAIL', payload: error.message });
    }
}

// Aggregate price values for a given region
const getAveragePrices = (prices) => {
        // Getting average prices is very computationally expensive, just returning sorted first price for now
        // WIP

        return prices[0].sort((p1, p2) => {
            if (p1.item === p2.item) {
                return p1.size < p2.size ? -1 : 1
            }
            else {
                return p1.item < p2.item ? -1 : 1
            }
        });
}