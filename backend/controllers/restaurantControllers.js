import mongoose from "mongoose";
import { Location } from "../models/restaurantModel.js";

export const addNewRestaurant = (req, res) => {
    let newRestaurant = new Location(req.body);

    newRestaurant.save((err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
        console.log("Restaurant added successfully");
    });
};

export const getRestaurants = (req, res) => {
    Location.find({}, (err, Restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(Restaurant);
    });
};

export const getRestaurantWithID = (req, res) => {
    Location.findById(req.params.RestaurantId, (err, Restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(Restaurant);
     });
}