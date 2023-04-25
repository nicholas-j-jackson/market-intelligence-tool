import mongoose from "mongoose";
import { FoodSchema } from "../models/foodModel.js";

const Food = mongoose.model("Food", FoodSchema);

// A function to add a new food to the database
export const addNewFood = (req, res) => {
    let newFood = new Food(req.body);

    newFood.save((err, food) => {
        if (err) {
            res.send(err);
        }
        res.json(food);
        console.log("Food added successfully");
    });
};

// A function to get all foods from the database
export const getFoods = (req, res) => {
    Food.find({}, (err, food) => {
        if (err) {
            res.send(err);
        }
        res.json(food);
    });
}; 

// A function to get all foods from a specific address
export const getFoodFromAddress = (req, res) => {
    Food.find({actual_address: req.params.actual_address}, (err, food) => {
        if (err) {
            res.send(err);
        }
        res.json(food);
    });
};

// A function to get all foods with a specific ID
export const getFoodFromID = (req, res) => {
    Food.find({id: req.params.id}, (err, food) => {
        if (err) {
            res.send(err);
        }
        res.json(food);
    });
}

// A function to put a food
export const putFood = (req, res) => {
    Food.findOneAndUpdate({id: req.params
        .id
    }, req
        .body, {new: true, useFindAndModify: false}, (err, food) => {
        if (err) {
            res.send
            (err);
        }
        res.json(food);
    });
};

// A function to delete a food from the database
export const deleteFood = (req, res) => {
    Food.remove({id: req.params.id}, (err, food) => {
        if (err) {
            res.send(err);
        }
        res.json({message: "Successfully deleted food"});
    });
};



