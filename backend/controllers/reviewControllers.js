import { Review } from "../models/reviewModel";

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



