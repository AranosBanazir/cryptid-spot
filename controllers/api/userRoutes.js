const router = require('express').Router();
const { Spotter } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const createSpotter = await Spotter.create(
      req.body
    )
    res.status(200).send('User created succesfully')
  } catch (err) {
    res.status(400).send('Server error creating user');
  }
})





router.post('/login', async (req, res) => {
  try {
    const spotterData = await Spotter.findOne({ where: { email: req.body.email } });

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
      
      res.json({ Spotter: spotterData, message: 'You are now logged in!' });
    });

  } catch (err) {
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
