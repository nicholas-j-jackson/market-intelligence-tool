import {getUsers, getUserByUsername, createUser, loginUser} from '../controllers/userControllers.js'

const userRoutes = (app) => {
    app.route('/users')
        .get(getUsers)
        
    app.route('/users/:username')
        .get(getUserByUsername)

    app.route('/users/login')
        .post(loginUser);

    app.route('/users/create')
        .post(createUser);
}

export default userRoutes;