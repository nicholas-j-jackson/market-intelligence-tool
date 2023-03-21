import {Restaurant} from '../models/restaurantModel.js';


export const getRestaurantByCity = (req, res) => {
    const type = req.params.type;
    const city = req.params.city;

    Restaurant.find({"type": type, "City": city}, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
    })
}

export const getRestaurantBybizId = (req, res) => {
    const type = req.params.type;
    const bizId = req.params.bizId;

    Restaurant.find({"type": type, "bizId": bizId}, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
    })
}
