import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const priceSchema = new Schema({
    store_id: {
        type: Number,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

export const Price = mongoose.model('Price', priceSchema);