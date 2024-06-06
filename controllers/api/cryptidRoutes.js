const router = require('express').Router();
const { Spotter, Cryptid, Sighting } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const createCryptid = await Cryptid.create(
        req.body
      )
      res.status(200).send('Cryptid created succesfully')
    } catch (err) {
      res.status(400).send('Server error creating Cryptid');
    }
  })

router.get('/', async (req, res) => {
    try {
        const cryptidData = await Cryptid.findAll({
            include: [{model: Spotter, attributes: ['username']}]
        })
        const cryptids = cryptidData.map((cryptid => cryptid.get({plain:true})))
        res.status(200).json(cryptids)
    } catch (err) {
        res.status(400).send('Server error retrieving Cryptids');
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const cryptidData = await Cryptid.findByPk(id, 
            {
                include: [{model: Spotter, attributes: ['username']}]
            })

        const cryptid = cryptidData.get({plain: true})

        res.status(200).json(cryptid)
    } catch (err) {
        res.status(400).send('Server error retrieving Cryptid');
    }
})
module.exports = router;
