const sequelize = require('../config/connection');
const { Spotter, Cryptid, Sighting } = require('../models');

const spotterData = require('./spotterData.json');
const cryptidData = require('./cryptidData.json');
const sightingData = require('./sightingData.json');




const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Spotter.bulkCreate(spotterData);

  await Cryptid.bulkCreate(cryptidData);

  await Sighting.bulkCreate(sightingData);

  process.exit(0);
};

seedDatabase();
