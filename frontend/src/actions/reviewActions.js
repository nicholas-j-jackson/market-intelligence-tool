import axios from 'axios';

export const listReviewsByCity = (city) => async (dispatch) => {
    try {
        dispatch({ type: 'REVIEW_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/reviews/city/${city}`);
        dispatch({ type: 'REVIEW_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'REVIEW_LIST_FAIL', payload: error.message });
    }
}

export const listReviewsByBizID = (bizID) => async (dispatch) => {
    try {
        dispatch({ type: 'REVIEW_LIST_REQUEST' });
        const { data } = await axios.get(`http://localhost:3001/api/reviews/bizID/${bizID}`);
        dispatch({ type: 'REVIEW_LIST_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'REVIEW_LIST_FAIL', payload: error.message });
    }
}