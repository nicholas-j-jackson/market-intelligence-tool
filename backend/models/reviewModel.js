import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const reviewSchema = new Schema({
    _id: {
        type: String,
        required: "The ID of the review within MongoDB is required"
    },
    bizId: {
        type: String,
        required: "The businessID specified by Yelp is required"
    },
    date: {
        type: Date,
        default: Date.now,
        required: "The date of the review is required"
    },
    review_text: {
        type: String,
        required: "The review text is required"
    },
    City: {
        type: String,
        required: "The city of the business is required"
    },
    State: {
        type: String,
        required: "The state of the business is required"
    },
 
});

export const Review = mongoose.model('Review', reviewSchema);