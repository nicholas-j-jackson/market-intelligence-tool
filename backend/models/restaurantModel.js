import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const restaurantSchema = new Schema({
    _id: {
        type: String,
        required: "The ID of the restaurant within MongoDB is required"
    },
    bizId: {
        type: String,
        required: "The businessID specified by Yelp is required"
    },
    name: {
        type: String,
        required: "The name of the restaurant is required"
    },
    address: {
        type: String,
        required: "The address of the restaurant is required"
    },
    rating: {   
        type: Number,
        required: "The rating of the restaurant is required"
    },
    review_count: {
        type: Number,
        required: "The review count of the restaurant is required"
    },
    price: {
        type: String,
        required: "The price of the restaurant is required"
    },
    url: {
        type: String,
        required: "The url of the restaurant is required"
    },
    State: {
        type: String,
        required: "The state of the restaurant is required"
    },
    City: {
        type: String,
        required: "The city of the restaurant is required"
    },
});

export const Review = mongoose.model('Restaurant', restaurantSchema);