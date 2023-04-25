import { Price } from "../models/priceModel.js";


// A function to add a new price to the database
export const addNewPrice = (req, res) => {
    let newPrice = new Price(req.body);

    newPrice.save((err, price) => {
        if (err) {
            res.send(err);
        }
        res.json(price);
        console.log("price added successfully");
    });
};

// A function to get all prices from the database
export const getPrices = (req, res) => {
    Price.find({}, (err, price) => {
        if (err) {
            res.send(err);
        }
        res.json(price);
    });
};

// A function to get a specific price by their ID and store number
export const getPriceByStoreNumberAndProduct = (req, res) => {
    const type = req.params.type;
    const store_id = req.params.store_id;
    const item = req.params.item;
    
    Price.findOne({"type": type, "store_id": store_id, "item": item}, (err, price) => {
        if (err) {
            res.send(err);
        }
        res.json(price);
    })
}


// A function to get all prices from a specific store by the store number
export const getAllPricesFromStore = (req, res) => {
    const type = req.params.type;
    const store_id = req.params.store_id;
    
    Price.find({"type": type, "store_id": store_id}, (err, price) => {
        if (err) {
            res.send(err);
        }
        res.json(price);
    })
}