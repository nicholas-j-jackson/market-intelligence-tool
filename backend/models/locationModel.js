import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const locationSchema = new Schema({
    store_id: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
});

export const Location = mongoose.model('Location', locationSchema);