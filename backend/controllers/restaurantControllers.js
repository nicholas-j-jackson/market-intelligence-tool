import mongoose from "mongoose";
import {RestaurantSchema} from "../models/restaurantModel.js"

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export const addNewRestaurant = (req, res) => {
    let newRestaurant = new Restaurant(req.body);

    newRestaurant.save((err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
        console.log("Restaurant added successfully");
    });
};

export const getRestaurants = (req, res) => {
    Restaurant.find({}, (err, Restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(Restaurant);
    });
};

export const getRestaurantWithID = (req, res) => {
    Restaurant.findById(req.params.RestaurantId, (err, Restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(Restaurant);
     });
}


