import db from '../config/database.js';

export async function getAllSpots(sortBy) {
    let query = db('spots')
        .select(
            'spots.*', // Get all fields from spots
            db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_wifi_rating', ['WiFi']),
            db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_power_sockets_rating', ['Power sockets']),
            db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_crowdedness_rating', ['Crowdedness']),
            db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_open_late_rating', ['Open late']),
            db.raw('(SELECT COUNT(*) FROM comments WHERE comments.spot = spots.id) as comment_count') // Subquery for comment count
        )
        .leftJoin('feedback', 'spots.id', 'feedback.spot')  // Join with feedback table
        .leftJoin('feedback_type', 'feedback.type', 'feedback_type.id')  // Join with feedback_type
        .groupBy('spots.id')  // Group by spot ID

        if (sortBy == 'default'){
            query = query.orderBy('spots.created_at', 'desc');
        } else if (sortBy == 'newest-oldest') {
            query = query.orderBy('spots.created_at', 'desc');
        } else if (sortBy == 'oldest-newest') {
            query = query.orderBy('spots.created_at', 'asc');
        }

        return await query;
}