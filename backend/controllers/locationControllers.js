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
    const store_id = req.params.store_id;

    Location.findOne({"type": type, "store_id": store_id}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
};

export const getLocationsByTypeAndState = (req, res) => {
    const type = req.params.type;
    const state = req.params.state;

    Location.find({"type": type, "state": state}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}

export const getLocationsByState = (req, res) => {
    const state = req.params.state;

    Location.find({"state": state}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}

export const getLocationsByZip = (req, res) => {
    const zip = req.params.zip;

    Location.find({"zip": zip}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}