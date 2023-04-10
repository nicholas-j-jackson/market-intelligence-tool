export const location1PriceReducer = (state = { location1Prices: [] }, action) => {
    switch (action.type) {
        case 'LOCATION1_PRICE_LIST_REQUEST':
            return { loadingLocation1: true, location1Prices: [] }
        case 'LOCATION1_PRICE_LIST_SUCCESS':
            return { loadingLocation1: false, location1Prices: action.payload }
        case 'LOCATION1_PRICE_LIST_FAIL':
            return { loadingLocation1: false, errorLocation1: action.payload}
        default:
            return state;
    }
}

export const location2PriceReducer = (state = { location2Prices: [] }, action) => {
    switch (action.type) {
        case 'LOCATION2_PRICE_LIST_REQUEST':
            return { loadingLocation2: true, location2Prices: [] }
        case 'LOCATION2_PRICE_LIST_SUCCESS':
            return { loadingLocation2: false, location2Prices: action.payload }
        case 'LOCATION2_PRICE_LIST_FAIL':
            return { loadingLocation2: false, errorLocation2: action.payload}
        default:
            return state;
    }
}

export const location3PriceReducer = (state = { location3Prices: [] }, action) => {
    switch (action.type) {
        case 'LOCATION3_PRICE_LIST_REQUEST':
            return { loadingLocation3: true, location3Prices: [] }
        case 'LOCATION3_PRICE_LIST_SUCCESS':
            return { loadingLocation3: false, location3Prices: action.payload }
        case 'LOCATION3_PRICE_LIST_FAIL':
            return { loadingLocation3: false, errorLocation3: action.payload}
        default:
            return state;
    }
}