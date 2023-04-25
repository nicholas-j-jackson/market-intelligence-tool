import axios from 'axios';

// List all reviews within a specific city by making a GET request to the backend
export const listReviewsByCity = (city) => async (dispatch) => {
    try {
        dispatch({ type: 'REVIEW_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/reviews/city/${city.split(',')[0]}`);
        dispatch({ type: 'REVIEW_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'REVIEW_LIST_FAIL', payload: error.message });
    }
}

// List all reviews from a specific store by making a GET request to the backend
export const listReviewsByBizID = (bizID) => async (dispatch) => {
    try {
        dispatch({ type: 'REVIEW_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/reviews/bizID/${bizID}`);
        dispatch({ type: 'REVIEW_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'REVIEW_LIST_FAIL', payload: error.message });
    }
}