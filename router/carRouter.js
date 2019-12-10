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

router.get('/:id', validateId, (req, res) => {
  const id = req.params.id

  dbCars.getById(id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(error => {
      res.status(500).json({ message: "Error getting that car", error })
    })
});

router.post('/', validatePost, (req, res) => {
  const carInfo = req.body

  dbCars.insert(carInfo)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding Car" })
    })
});


// custom middleware

function validateId(req, res, next) {
  const id = req.params.id

  if(!id) {
    res.status(404).json({message: "Missing Car ID"})
  } else {
    dbCars.getById(id)
    .then(found => {
      if(!found) {
        res.status(400).json({message: "A car with that ID can not be found."})
      } else {
        next();
      }
    })
    .catch(error => {
      res.status(500).json({message: "Error getting that car.", error})
    })
  }
  next();
}

function validatePost(req, res, next) {
  const carInfo = req.body

  if (!carInfo.VIN && !carInfo.make && !carInfo.model && !carInfo.mileage) {
    res.status(404).json({ ErrorMessage: "Missing necessary Car Information" })
  } else {
    next();
  }
}

module.exports = router;