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
      res.status(500).json({ message: "Error adding Car", error })
    })
});

router.put('/:id', validateId, (req, res) => {
  const id = req.params.id
  const carInfo = req.body

  dbCars.getById(id)
    .then(found => {
      if (!carInfo.VIN || !carInfo.make || !carInfo.model || !carInfo.engine || !carInfo.transmission || !carInfo.mileage || !carInfo.title_status) {
        res.status(400).json({ errorMessage: "Please provide an update" })
      } else if (!found) {
        res.status(400).json({ message: "Wrong Id" })
      } else {
        dbCars.update(id, carInfo)
          .then(carUpdate => {
            res.status(200).json({ message: 'Updated with:', VIN: `${carInfo.VIN}`, make:`${carInfo.make}`, model:`${carInfo.model}`, engine:`${carInfo.engine}`, transmission:`${carInfo.transmission}`, mileage:`${carInfo.mileage}`, title_status:`${carInfo.title_status}` })
          })
          .catch((error) => {
            res.status(500).json({ message: "Error updating car", error })
          })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "The Update had problems", error })
    })
});


router.delete('/:id', validateId, (req, res) => {
  const id = req.params.id

  dbCars.getById(id)
    .then(deletedCar => {
      if (deletedCar) {
        dbCars.remove(id, deletedCar)
          .then(gone => {
            res.status(200).json({ message: "The car was deleted", deletedCar })
          })
          .catch(() => {
            res.status(500).json({ message: "There was an error deleting the car" })
          })
      } else {
        res.status(404).json({ message: "A car with that id doesn't exist" })
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Deleting the car...Not Happening!" })
    })
});

// custom middleware

function validateId(req, res, next) {
  const id = req.params.id

  dbCars.getById(id)
    .then(id => {
      req.car = id
    })
    .catch(() => {
      res.status(400).json({ message: "invalid car id" })
    })
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