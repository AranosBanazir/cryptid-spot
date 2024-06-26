const router = require('express').Router();
const withAuth = require('../../utils/auth')
const { Op } = require('sequelize');
const { Spotter, Cryptid, Sighting } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    const spotter_id = req.session.spotter_id
    const {name, description, region, image} = req.body
    const validatedName = name.charAt(0).toUpperCase() + name.slice(1)
    try {
      const createCryptid = await Cryptid.create({
        name: validatedName , description, region, spotter_id, image
      })
      res.status(200).send('Cryptid created succesfully')
    } catch (err) {
        console.log(err)
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

router.get('/lib/:char', async (req, res) => {
    try {
        const char = req.params.char
        const cryptidData = await Cryptid.findAll({
            where: {
                name: { [Op.startsWith]: char
                }
            }
        })
        const cryptids = cryptidData.map((cryptid => cryptid.get({plain:true})))
        res.status(200).json(cryptids)
    } catch (err) {
        res.status(400).send('Server error retrieving Cryptids');
    }
})




module.exports = router;
