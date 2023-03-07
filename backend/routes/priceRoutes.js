import {addNewPrice, getPrices, getPriceByStoreNumberAndProduct, getAllPricesFromStore} from '../controllers/priceControllers.js'

const priceRoutes = (app) => {
    app.route('/prices')
        // GET endpoint
        .get(getPrices)
    
        // POST Endpoint
            .post(addNewPrice);

    app.route('/prices/type_id_item/:type/:store_id/:item')
        .get(getPriceByStoreNumberAndProduct);

    app.route('/prices/type_id/:type/:store_id')
        .get(getAllPricesFromStore);
    
}

export default priceRoutes;