export const locationsReducer = (state = { locations: [] }, action) => {
    switch (action.type) {
        case 'LOCATIONS_LIST_REQUEST':
            return { loading: true, locations: [] }
        case 'LOCATIONS_LIST_SUCCESS':
            return { loading: false, locations: action.payload }
        case 'LOCATIONS_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}    
