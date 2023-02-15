import mongoose from "mongoose";
import { Location } from "../models/locationModel.js";

export const addNewLocation = (req, res) => {
    let newLocation = new Location(req.body);

    newLocation.save((err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
        console.log("Location added successfully");
    });
};

export const getLocations = (req, res) => {
    Location.find({}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    });
};

export const getLocationByStoreNumber = (req, res) => {
    const store_number = req.params.store_number;

    Location.findOne({"store_number": store_number}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}