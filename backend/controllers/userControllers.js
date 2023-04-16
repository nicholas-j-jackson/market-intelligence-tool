import bcrypt from 'bcrypt';
import { User } from "../models/userModel.js";

export const getUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

export const getUserByUsername = (req, res) => {
    const username = req.params.username;
    User.findOne({"username": username}, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    })
}; 

export const getUserById = (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    })
}; 

export const loginUser = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        
        User.findOne({ "username": username }, (err, user) => {
            if (err) {
                res.json({
                    "status": "catch_error",
                    "message": "There is no account associated with the given user."
                })
            }
            if (user === null) {
                res.json({
                    "status": "user_does_not_exist",
                    "message": "There is no account associated with the given user."
                })
            }
            else {
            const hashed = user.password;
            bcrypt.compare(password, hashed)
                .then(result => {
                    if (result) {
                        res.json({
                            "status": "login_successful",
                            "message": "Login attempt was successful.",
                            "account_data": user
                        })
                    } else {
                        res.json({
                            "status": "incorrect_password",
                            "message": "An error was thrown while comparing the given password to the hashed password."
                        })
                    }
                })
            }
        })
};

export const createUser = (req, res) => {
    const username = req.body.username;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;

    User.find({$or:[{"username": username},{"email": email}]}, (err, user) => {
        if (err) {
            res.status(400).json({
                "status": "catch_error",
                "message": "An error was thrown while checking for duplicate usernames."
            })
        }
        if (user.length > 0) {
            res.json({
                "status": "duplicate_username_or_email",
                "message": "A user already exists with the given username or email."
            })
        }
    })

    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
        .then(hashed => {
            const newUser = new User({ 
                username, 
                password: hashed, 
                first_name, 
                last_name, 
                email
            });
            
        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => {
                res.status(400).json({                           
                    "status": "catch_error",
                    "message": "An error was thrown while saving the user to the database."
                })
            })
        })
        .catch(err => {
            res.status(400).json({
                "status": "catch_error",
                "message": "An error was thrown while hashing the password."
            })
        })
};

