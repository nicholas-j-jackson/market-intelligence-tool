import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const locationSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    store_number: {
        type: Number,
        required: true
    },
    store_name: {
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
    zip_code: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    store_hours: {
        type: String,
        required: true
    },
    wifi: {
        type: String,
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
    county: {
        type: String,
        required: true
    },
    geo_accuracy: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true
    },
    is24Hours: {
        type: String,
        required: true
    }

});

export const Location = mongoose.model('Location', locationSchema);