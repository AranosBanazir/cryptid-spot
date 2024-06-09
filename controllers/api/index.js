const router = require("express").Router();
const spotterRoutes = require("./spotterRoutes");
const sightingRoutes = require("./sightingRoutes");
const cryptidRoutes = require("./cryptidRoutes");
const mapRoutes = require("./mapRoutes");

router.use("/sightings", sightingRoutes);

router.use("/cryptids", cryptidRoutes);

router.use("/spotters", spotterRoutes);

router.use("/map", mapRoutes);

module.exports = router;
