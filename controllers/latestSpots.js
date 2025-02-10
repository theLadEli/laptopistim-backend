import db from '../config/database.js';

export default async function getLatestSpots() {
    try {
        const spotsWithFeedback = await db('spots')
            .select(
                'spots.id',
                'spots.name',
                'spots.address',
                'spots.recommended',
                'spots.approved',
                'spots.city',
                'spots.created_by',
                'spots.created_at',
                'spots.image',
                db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_wifi_rating', ['WiFi']),
                db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_power_sockets_rating', ['Power sockets']),
                db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_crowdedness_rating', ['Crowdedness']),
                db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_open_late_rating', ['Open late'])
            )
            .leftJoin('feedback', 'spots.id', 'feedback.spot')  // Join with feedback table
            .leftJoin('feedback_type', 'feedback.type', 'feedback_type.id')  // Join with feedback_type table
            .groupBy('spots.id')  // Group by spot (each cafe)
            .orderBy('spots.created_at', 'desc')  // Order spots by creation date
            .limit(10);  // Limit to the latest 10 spots

        return spotsWithFeedback;
    } catch (error) {
        console.error("Error fetching latest spots:", error);
        throw new Error('Error fetching latest spots');
    }
}
