const express = require('express');
const router = express.Router();
const tours = require("../controller/tourscontroller");
const counter = require('../middleware/counterfunction');

router.route("/")
    .get(tours.getTours)
    .post(tours.saveTours)

router.route("/trending").
    get(tours.trandingTours)

router.route("/cheapest").
    get(tours.cheapestTours)

router.route("/:id")
    .patch(tours.updateTours)
    .get(counter, tours.getSingleTours)

module.exports = router;