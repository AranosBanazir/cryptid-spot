const router = require('express').Router();
const spotterRoutes = require('./spotterRoutes');

router.use('/spotters', spotterRoutes);

module.exports = router;
