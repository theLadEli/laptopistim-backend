import db from '../config/database.js';

export default async function spotFeedback(req,res){
    const { title, comment, id, userId } = req.body;

    try {
        const [commentId] = await db('comments').insert({
            title,
            comment,
            spot: id,
            created_by: userId
        }).returning("id")

        res.json({commentId})

    } catch(error) {
        console.error("Error leaving spot feedback:", error.message);
        res.status(401).json({ message: error.message });
    }
}