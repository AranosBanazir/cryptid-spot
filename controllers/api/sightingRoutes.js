const router = require("express").Router();
const { Spotter, Cryptid, Sighting } = require("../../models");

router.post("/", async (req, res) => {
  const newSighting = {
    spotter_id: req.session.Spotter_id,
    ...req.body,
  };

  console.log(newSighting);

  try {
    const createSightings = await Sighting.create(newSighting);
    res.status(201).send("Sighting created succesfully");
  } catch (err) {
    console.log(err)
    res.status(400).send("Server error creating sighting");
  }
});

router.get("/", async (req, res) => {
  try {
    const sightingsData = await Sighting.findAll({
      include: [
        { model: Spotter, attributes: ["username"] },
        { model: Cryptid, attributes: ["name"] },
      ],
    });
    const sightings = sightingsData.map((sighting) =>
      sighting.get({ plain: true })
    );
    res.status(200).send(sightings);
  } catch (err) {
    res.status(400).send("Server error retrieving Sightings");
  }
});

router.get("/spotter/:id", async (req, res) => {
  try {
    const spotter_id = req.params.id;
    const spotterSightingsData = await Sighting.findAll({
      where: { spotter_id },
      include: [{ model: Spotter, attributes: ["username"] }],
    });
    const spotterSightings = spotterSightingsData.map((sighting) =>
      sighting.get({ plain: true })
    );
    res.status(200).json(spotterSightings);
  } catch (err) {
    res.status(400).send("Server error retrieving Sightings");
  }
});

router.get("/cryptid/:id", async (req, res) => {
  try {
    const cryptid_id = req.params.id;
    const cryptidSightingsData = await Sighting.findAll({
      where: { cryptid_id },
    });
    const cryptidSightings = cryptidSightingsData.map((sighting) =>
      sighting.get({ plain: true })
    );
    res.status(200).json(cryptidSightings);
  } catch (err) {
    res.status(400).send("Server error retrieving Sightings");
  }
});

module.exports = router;
