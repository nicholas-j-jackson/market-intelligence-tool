import {addNewPrice, getPrices, getPriceByStoreNumberAndProduct, getAllPricesFromStore} from '../controllers/priceControllers.js'

const priceRoutes = (app) => {
    app.route('/prices')
        // GET endpoint
        .get(getPrices)
    
        // POST Endpoint
            .post(addNewPrice);

    app.route('/prices/:type/:store_number/:product')
        .get(getPriceByStoreNumberAndProduct);

    app.route('/prices/:type/:store_number')
        .get(getAllPricesFromStore);
    
}

export default priceRoutes;