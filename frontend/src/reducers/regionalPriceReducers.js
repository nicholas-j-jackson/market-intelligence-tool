export const region1AvgPriceReducer = (state = { region1AvgPrices: [] }, action) => {
    switch (action.type) {
        case 'REGION1_PRICE_LIST_REQUEST':
            return { loadingRegion1: true, region1AvgPrices: [] }
        case 'REGION1_PRICE_LIST_SUCCESS':
            return { loadingRegion1: false, region1AvgPrices: action.payload }
        case 'REGION1_PRICE_LIST_FAIL':
            return { loadingRegion1: false, errorRegion1: action.payload}
        default:
            return state;
    }
}

export const region2AvgPriceReducer = (state = { region2AvgPrices: [] }, action) => {
    switch (action.type) {
        case 'REGION2_PRICE_LIST_REQUEST':
            return { loadingRegion2: true, region2AvgPrices: [] }
        case 'REGION2_PRICE_LIST_SUCCESS':
            return { loadingRegion2: false, region2AvgPrices: action.payload }
        case 'REGION2_PRICE_LIST_FAIL':
            return { loadingRegion2: false, errorRegion2: action.payload}
        default:
            return state;
    }
}