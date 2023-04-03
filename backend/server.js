import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/foodRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import priceRoutes from './routes/priceRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL.toString();

const app = express();


// MongoDB connection
mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Associate routes with app
routes(app);
locationRoutes(app);
priceRoutes(app);
restaurantRoutes(app);
reviewRoutes(app);
userRoutes(app);

app.get('/', (req, res) => {
    res.send(`Hello World! ${PORT}`);
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`);
});