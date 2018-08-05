const express = require('express');
const getNewReleases = require('../../../lib/spotify');

module.exports = express.Router()
    .get('/newReleases',
        async (req, res) => {
            try {
                const token = req.query.token;
                const fetchSongs = await getNewReleases(token);
                return res.status(200).send(fetchSongs.albums.items)
            } catch (err) {
                return res.status(500).send(err);
            }
        });