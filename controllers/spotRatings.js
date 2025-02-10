import db from '../config/database.js';

export default async function spotRatings(req,res){
    const { userId, id, wifiRating, powerSocketRating, occupancyRating, openLateRating } = req.body;

    try {
        if (wifiRating != '') {
            await db('feedback').insert({
                value: wifiRating,
                type: 1,
                spot: id,
                created_by: userId
            }).returning('id')
        }

        if (powerSocketRating != '') {
            await db('feedback').insert({
                value: powerSocketRating,
                type: 3,
                spot: id,
                created_by: userId
            }).returning('id')
        }

        if (occupancyRating != '') { 
            await db('feedback').insert({
                value: occupancyRating,
                type: 2,
                spot: id,
                created_by: userId
            }).returning('id')
        }

        if (openLateRating != '') {
            await db('feedback').insert({
                value: openLateRating,
                type: 4,
                spot: id,
                created_by: userId
            }).returning('id')
        }

        res.status(200).json({ message: 'Ratings have been recorded successfully' });

    } catch(error) {
        console.error("Error leaving spot ratings:", error.message);
        res.status(401).json({ message: error.message });
    }
}