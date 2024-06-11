const router = require("express").Router();
const spotterRoutes = require("./spotterRoutes");
const sightingRoutes = require("./sightingRoutes");
const cryptidRoutes = require("./cryptidRoutes");

router.use("/sightings", sightingRoutes);

router.use("/cryptids", cryptidRoutes);

router.use("/spotters", spotterRoutes);

module.exports = router;
