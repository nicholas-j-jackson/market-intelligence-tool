export const reviewReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case 'REVIEW_LIST_REQUEST':
            return { loading: true, reviews: [] }
        case 'REVIEW_LIST_SUCCESS':
            return { loading: false, reviews: action.payload }
        case 'REVIEW_LIST_FAIL':
            return { loading: false, error: action.payload}
        default:
            return state;
    }
}
