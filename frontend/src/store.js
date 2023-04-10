import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { locationsReducer } from './reducers/locationsReducers'
import { location1PriceReducer, location2PriceReducer, location3PriceReducer } from './reducers/priceReducers'

const initialState = {
    locations: {},

    location1Prices: [],
    location2Prices: [],
    location3Prices: [],


  }

const reducer = combineReducers({
  locationList: locationsReducer,
  location1PriceList: location1PriceReducer,
  location2PriceList: location2PriceReducer,
  location3PriceList: location3PriceReducer,

})

  
  const middleware = [thunk]
  
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  
  export default store