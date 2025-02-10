import db from '../config/database.js';

export default async function spotRatings(req,res){
    const { userId, id, wifiRating, powerSocketRating, occupancyRating, openLateRating } = req.body;

    try {
        if (wifiRating != '') {
            // const [wifiFeedbackId] = 
            await db('feedback').insert({
                value: wifiRating,
                type: 1,
                spot: id,
                created_by: userId
            }).returning('id')
        }

        if (powerSocketRating != '') {
            // const [powersocketFeedbackId] = 
            await db('feedback').insert({
                value: powerSocketRating,
                type: 3,
                spot: id,
                created_by: userId
            }).returning('id')
        }

        if (occupancyRating != '') {
            // const [occupancyFeedbackId] = 
            await db('feedback').insert({
                value: occupancyRating,
                type: 2,
                spot: id,
                created_by: userId
            }).returning('id')
        }

        if (openLateRating != '') {
            // const [openlateFeedbackId] = 
            await db('feedback').insert({
                value: openLateRating,
                type: 4,
                spot: id,
                created_by: userId
            }).returning('id')
        }

        // res.json({ })

    } catch(error) {
        console.error("Error leaving spot ratings:", error.message);
        res.status(401).json({ message: error.message });
    }
}