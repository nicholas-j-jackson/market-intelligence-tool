import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const priceSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    store_number: {
        type: Number,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

export const Price = mongoose.model('Price', priceSchema);