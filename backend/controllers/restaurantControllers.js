import {Restaurant} from '../models/restaurantModel.js';


export const getRestaurantByCity = (req, res) => {
    const city = req.params.city;

    Restaurant.find({"City": city}, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
    })
}

export const getRestaurantBybizId = (req, res) => {
    const bizId = req.params.bizId;

    Restaurant.find({"bizId": bizId}, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
    })
}


export const getRestaurantByRestaurantName = (req, res) => {
    const restaurantName = req.params.restaurantName;
    Restaurant.find({"name": restaurantName}, (err, restaurant) => {
        if (err){
            res.send(err);
        }  
        res.json(restaurant);
    })
}

export const getAllRestaurants = (req, res) => {
    Restaurant.find({}, (err, restaurant) => {
        if (err){
            res.send(err);
        }
        res.json(restaurant);
    })
}