const router = require('express').Router();
const { Spotter, Cryptid, Sighting } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const createSightings = await Sighting.create(
        req.body
      )
      res.status(200).send('Sighting created succesfully')
    } catch (err) {
      res.status(400).send('Server error creating sighting');
    }
  })

  router.get('/', async (req, res) => {
    try {
        const sightingsData = await Sighting.findAll({
            include: [{model: Spotter, attributes: ['username']}]
        })
        const sightings = sightingsData.map((sighting => sighting.get({plain: true})))
        res.status(200).json(sightings)
    } catch (err) {
        res.status(400).send('Server error retrieving Sightings');
    }
  })

  router.get('/spotter/:id', async (req, res) => {
    try {
        const spotter_id = req.params.id
        const spotterSightingsData = await Sighting.findAll({
            where: {spotter_id},
                include: [{model: Spotter, attributes: ['username']}]
        })
        const spotterSightings = spotterSightingsData.map((sighting => sighting.get({plain: true})))
        res.status(200).json(spotterSightings)
    } catch (err) {
        res.status(400).send('Server error retrieving Sightings');
    }
  })

  router.get('/cryptid/:id', async (req, res) => {
    try {
        const cryptid_id = req.params.id
        const cryptidSightingsData = await Sighting.findAll({
            where: {cryptid_id}
        })
        const cryptidSightings = cryptidSightingsData.map((sighting => sighting.get({plain: true})))
        res.status(200).json(cryptidSightings)
    } catch (err) {
        res.status(400).send('Server error retrieving Sightings');
    }
  })

module.exports = router;
