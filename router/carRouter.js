const express = require('express');

const router = express.Router();

router.use(express.json())

const dbCars = require('./carDb')

router.get('/', (req, res) => {
    dbCars.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(() => {
      res.status(500).json({ message: "Error getting the cars" })
    })
});

module.exports = router;