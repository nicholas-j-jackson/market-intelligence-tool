import {getUsers, getUserByUsername, createUser, loginUser, getUserById} from '../controllers/userControllers.js'

const userRoutes = (app) => {
    // Define the route for getting all users
    app.route('/api/users')
        .get(getUsers)
        
    // Define the route for getting a specific user by their username
    app.route('/api/users/:username')
        .get(getUserByUsername)

    // Define the route for getting a specific user by their ID
    app.route('/api/users/id/:id')
        .get(getUserById)

    // Define the route for a user logging in
    app.route('/api/users/login')
        .post(loginUser);

    // Define the route for creating a new user
    app.route('/api/users/create')
        .post(createUser);
}

export default userRoutes;