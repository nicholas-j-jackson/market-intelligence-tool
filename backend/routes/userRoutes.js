import {getUsers, getUserByUsername, createUser, loginUser, getUserById} from '../controllers/userControllers.js'

const userRoutes = (app) => {
    app.route('/api/users')
        .get(getUsers)
        
    app.route('/api/users/:username')
        .get(getUserByUsername)

    app.route('/api/users/id/:id')
        .get(getUserById)

    app.route('/api/users/login')
        .post(loginUser);

    app.route('/api/users/create')
        .post(createUser);
}

export default userRoutes;