import { Price } from "../models/priceModel.js";

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

export const getPrices = (req, res) => {
    Price.find({}, (err, price) => {
        if (err) {
            res.send(err);
        }
        res.json(price);
    });
};

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