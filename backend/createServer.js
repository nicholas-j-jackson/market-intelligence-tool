import bodyParser from 'body-parser';
import routes from './routes/foodRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import priceRoutes from './routes/priceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import express from 'express';
import cors from 'cors';

// Create a function to create a server
function createServer() {
    // Bring in express
    const app = express();

    // Use cors to allow cross-origin requests
    app.use(cors());
    // bodyparser setup
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Associate routes with app
    routes(app);
    locationRoutes(app);
    priceRoutes(app);  
    userRoutes(app);
    return app;
}

export default createServer;