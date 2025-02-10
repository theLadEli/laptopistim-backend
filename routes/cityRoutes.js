import express from 'express';
import getCityStats from '../controllers/cityStats.js';
import getCities from '../controllers/cityStats.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const citiesStats = await getCities();
        res.json(citiesStats);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cities stats' });
    }
});

router.get('/:city', async (req, res) => {
    const {city} = req.params;

    try {
        const cityStats = await getCityStats(city);
        res.json(cityStats);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching city stats' });
    }
});

export default router;