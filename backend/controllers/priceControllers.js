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
    const store_number = req.params.store_number;
    const product = req.params.product;
    
    Price.findOne({"type": type, "store_number": store_number, "product": product}, (err, price) => {
        if (err) {
            res.send(err);
        }
        res.json(price);
    })
}

export const getAllPricesFromStore = (req, res) => {
    const type = req.params.type;
    const store_number = req.params.store_number;
    
    Price.find({"type": type, "store_number": store_number}, (err, price) => {
        if (err) {
            res.send(err);
        }
        res.json(price);
    })
}