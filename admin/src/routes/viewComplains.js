const express = require('express');
const router = express.Router();
const Complains = require("../models/complains")

router.get('/viewComplains', async (req, res) => {
    try {
        let query = {};

        // Check if the search query is provided
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');

            query = {
                $or: [
                    { district: { $regex: searchRegex } },
                    { area: { $regex: searchRegex } },
                    { complainHeader: { $regex: searchRegex } },
                    { complainNumber: { $regex: searchRegex } },
                    { status: { $regex: searchRegex } },
                ],
            };
        }

        // Fetch complaints based on the query
        const complains = await Complains.find(query);

        // Return the complaints as JSON
        res.render('viewComplains', { complains, searchQuery: req.query.search });
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
