import { Review } from '../models/reviewModel.js';


// A function to get all reviews from a specific restaurant by their ID
export const getReviewsBybizId = (req, res) => {
    const type = req.params.type;
    const bizId = req.params.bizId;
    
    Review.find({"type": type, "bizId": bizId}, (err, review) => {
        if (err) {
            res.send(err);
        }
        res.json(review);
    })

}

// A function to get all reviews from all restaurants within a specific city
export const getReviewsByCity = (req, res) => {
    const type = req.params.type;
    const city = req.params.city;

    Review.find({"type": type, "City": city}, (err, review) => {
        if (err) {
            res.send(err);
        }
        res.json(review);
    })
}



