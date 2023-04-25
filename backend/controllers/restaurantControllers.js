import {Restaurant} from '../models/restaurantModel.js';

// A function to get all restaurants from a specific city
export const getRestaurantByCity = (req, res) => {
    const city = req.params.city;

    Restaurant.find({"City": city}, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
    })
}

// A function to get a specific restaurant by their ID
export const getRestaurantBybizId = (req, res) => {
    const bizId = req.params.bizId;

    Restaurant.find({"bizId": bizId}, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
    })
}

// A function to get all restaurants with a specific name
export const getRestaurantByRestaurantName = (req, res) => {
    const restaurantName = req.params.restaurantName;
    Restaurant.find({"name": restaurantName}, (err, restaurant) => {
        if (err){
            res.send(err);
        }  
        res.json(restaurant);
    })
}

// A function to get all restaurants
export const getAllRestaurants = (req, res) => {
    Restaurant.find({}, (err, restaurant) => {
        if (err){
            res.send(err);
        }
        res.json(restaurant);
    })
}