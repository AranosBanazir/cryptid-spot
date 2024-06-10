const router = require('express').Router();
const { Spotter } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const createSpotter = await Spotter.create(
      req.body
    )
    req.session.save(() => {
      req.session.Spotter_id = createSpotter.dataValues.id;
      req.session.logged_in = true;
      res.status(200).send('User created succesfully')
    })
  } catch (err) {
    console.log(err)
    res.status(400).send('Server error creating user');
  }
})





router.post('/login', async (req, res) => {
  try {
    const spotterData = await Spotter.findOne({ where: { username: req.body.username } });

    if (!spotterData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await spotterData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.Spotter_id = spotterData.id;
      req.session.logged_in = true;
      res.status(200).send('You are now logged in!');
    });

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
