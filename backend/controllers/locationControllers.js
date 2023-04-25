import { Location } from "../models/locationModel.js";

// A function to add a new restaurant location to the database
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

// A function to get all restaurant locations from the database
export const getLocations = (req, res) => {
    Location.find({}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    });
};

// A function to get a specific restaurant location by their ID and store number
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

// A function to get all restaurant locations from a specific city
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

export const getLocationsByTypeAndZip = (req, res) => {
    const type = req.params.type;
    const zip = req.params.zip;

    Location.find({"type": type, "zip": zip}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}

// A function to get all restaurant locations from a specific city and state
export const getLocationsByTypeAndCityAndState = (req, res) => {
    const type = req.params.type;
    const city = req.params.city;
    const state = req.params.state;

    Location.find({"type": type, "city": city, "state": state}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}

// A function to get all restaurant locations from a specific state
export const getLocationsByState = (req, res) => {
    const state = req.params.state;

    Location.find({"state": state}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}

// A function to get all restaurant locations from a specific ZIP code
export const getLocationsByZip = (req, res) => {
    const zip = req.params.zip;

    Location.find({"zip": zip}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}

// A function to get all restaurant locations from a specific city and state
export const getLocationsByCityAndState = (req, res) => {
    const city = req.params.city;
    const state = req.params.state;

    Location.find({"city": city, "state": state}, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.json(location);
    })
}