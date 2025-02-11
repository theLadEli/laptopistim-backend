import express from 'express';
import { getAllSpots } from '../controllers/allSpots.js';
import getLatestSpots from '../controllers/latestSpots.js';
import getSpotDetails from '../controllers/spotDetails.js';
import spotFeedback from '../controllers/spotFeedback.js'
import spotRatings from '../controllers/spotRatings.js'

const router = express.Router();

router.get('/all', async (req, res) => {
    const sortBy = req.query.sortby;
    const filters = {
        sortBy: sortBy,
        wifi: false,
        wifiCommunityRated: false,
        openLate: false,
        powerSockets: false
    };

    if (req.query.wifi) {
        filters.wifi = true;
    }
    if (req.query.wificommunityrated) {
        filters.wifiCommunityRated = req.query.wificommunityrated;
    }
    if (req.query.openlate) {
        filters.openLate = true;
    }
    if (req.query.powersockets) {
        filters.powerSockets = true;
    }

    try {
        const spots = await getAllSpots(filters);
        res.json(spots);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching all spots' });
    }
});

router.get('/latest-spots', async (req, res) => {
    try {
        const spots = await getLatestSpots();
        res.json(spots);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching latest spots' });
    }
});

router.get('/spot/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const spotDetails = await getSpotDetails(id);
        res.json(spotDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching latest spots' });
    }
});

router.post('/spot-feedback', spotFeedback);
router.post('/spot-ratings', spotRatings);

export default router;