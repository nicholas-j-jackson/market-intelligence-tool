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

export const getLocationByTypeAndStoreNumber = (req, res) => {
    const type = req.params.type;
    const store_number = req.params.store_number;

    Location.findOne({"type": type, "store_number": store_number}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}