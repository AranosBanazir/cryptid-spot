const router = require('express').Router();
const { Spotter, Cryptid, Sighting } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return
  }

  res.render('signup')
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/profile', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/')
    return
  }

  try {
    const id = req.session.Spotter_id
    const profileData = Spotter.findByPk(id,{
      include: {Sighting, Cryptid}
    })
    // const spotterCryptidData = Cryptid.findAll({
    //   where: {
    //     spotter_id : id
    //   }
    // })
    // const spotterSightingData = Sighting.findAll({
    //   where: {
    //     spotter_id : id
    //   } , include: { model: Cryptid }
    // })
    // const spotterData = Spotter.findByPk(id, {
    //   attributes: [username, avatar ]
    // })
    const spotterCryptids = spotterCryptidData.map((cryptid => cryptid.get({plain: true})))
    const spotterSightings = spotterSightingData.map((sighting => sighting.get({plain: true})))
    const spotter = spotterData.get({plain: true})
    res.render('profile', {
      spotter,
      spotterCryptids,
      spotterSightings,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.get('/cryptid', (req, res) => {
  try {
    res.render('cryptid-library', {
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.get('/cryptid/:id', async (req, res) => {
  try {
    const id = req.params.id
    const cryptiddata = await Cryptid.findByPk(id,
      {
        include: {model: Sighting, include: [{model: Spotter, attributes: ['username']}]}
      }
    )
    const cryptid = cryptiddata.get({ plain: true })
    console.log(cryptid)
    res.render('cryptid', { 
      cryptid,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).send('Server error')
  }
})

module.exports = router;
