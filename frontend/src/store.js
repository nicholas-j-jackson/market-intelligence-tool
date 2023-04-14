import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { locationsReducer } from './reducers/locationsReducers'
import { location1PriceReducer, location2PriceReducer, location3PriceReducer } from './reducers/priceReducers'
import { region1AvgPriceReducer, region2AvgPriceReducer } from './reducers/regionalPriceReducers'
import { reviewReducer } from './reducers/reviewReducers'
import { restaurantReducer } from './reducers/restaurantReducers'

const initialState = {
    locations: {},

    location1Prices: [],
    location2Prices: [],
    location3Prices: [],

    region1AvgPrices: [],
    region2AvgPrices: [],

    reviewList: {},


  }

const reducer = combineReducers({
  locationList: locationsReducer,
  location1PriceList: location1PriceReducer,
  location2PriceList: location2PriceReducer,
  location3PriceList: location3PriceReducer,
  region1PriceList: region1AvgPriceReducer,
  region2PriceList: region2AvgPriceReducer,
  reviewList: reviewReducer,
  restaurantList: restaurantReducer,

})

  
  const middleware = [thunk]
  
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  
  export default store