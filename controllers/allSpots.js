import db from '../config/database.js';

export async function getAllSpots(filters) {
    try {
        let query = db('spots')
            .select(
                'spots.*', 
                db.raw('AVG(CASE WHEN feedback_type.id = 1 THEN feedback.value END) as avg_wifi_rating'),
                db.raw('AVG(CASE WHEN feedback_type.id = 3 THEN feedback.value END) as avg_power_sockets_rating'),
                db.raw('AVG(CASE WHEN feedback_type.id = 2 THEN feedback.value END) as avg_crowdedness_rating'),
                db.raw('AVG(CASE WHEN feedback_type.id = 4 THEN feedback.value END) as avg_open_late_rating'),
                db.raw('(SELECT COUNT(*) FROM comments WHERE comments.spot = spots.id) as comment_count') // Subquery for comment count
            )
            .leftJoin('feedback', 'spots.id', 'feedback.spot')  // Join with feedback table
            .leftJoin('feedback_type', 'feedback.type', 'feedback_type.id')  // Join with feedback_type
            .groupBy('spots.id')
            // .orderBy('spots.created_at', 'desc');

            // Applying sort by
            if (filters.sortBy === 'newest-oldest') {
                query = query.orderBy('spots.created_at', 'desc');
            } else if (filters.sortBy === 'oldest-newest') {
                query = query.orderBy('spots.created_at', 'asc');
            }

            // Applying filters
            if (filters.wifi) {
                query = query.havingRaw('AVG(CASE WHEN feedback_type.id = 1 THEN feedback.value END) >= 3');
            }
            if (filters.openLate) {
                query = query.havingRaw('AVG(CASE WHEN feedback_type.id = 4 THEN feedback.value END) >= 3');
            }
            if (filters.powerSockets) {
                query = query.havingRaw('AVG(CASE WHEN feedback_type.id = 3 THEN feedback.value END) >= 3');
            }

            if (filters.wifiCommunityRated) {
                query = query.havingRaw('AVG(CASE WHEN feedback_type.id = 1 THEN feedback.value END) >= ?', [filters.wifiCommunityRated]);
            }
            
            return await query;
    } catch (error) {
        console.error(error);
    }
}