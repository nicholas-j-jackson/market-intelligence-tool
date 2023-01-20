import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const FoodSchema = new Schema({
    name: {
        type: String,
        required: "Enter a food name"
    },
    target_address: {
        type: String,
        required: "Enter a target address"
    },
    actual_address: {
        type: String,
        required: "Enter an actual address"
    },
    restaurant_name : {
        type: String,
        required: "Enter a restaurant name"
    },
    price: {
        type: Number,
        required: "Enter a price"
    },
    scraped_date: {
        type: Date,
        default: Date.now
    },
    created_date: {
        type: Date,
        default: Date.now
    }
 
});