const Spotter = require('./Spotter');
const Cryptid = require('./Cryptid');
const Sighting = require('./Sighting');

//Relationships

Spotter.hasMany(Sighting, {
    foreignKey: 'spotter_id'
});
Sighting.belongsTo(Spotter, {
    foreignKey: 'spotter_id'
});
//

Spotter.hasMany(Cryptid, {
    foreignKey: 'spotter_id'
});
Cryptid.belongsTo(Spotter, {
    foreignKey: 'spotter_id'
});

//
Cryptid.hasMany(Sighting, {
    foreignKey: 'cryptid_id'
});
Sighting.belongsTo(Cryptid, {
    foreignKey: 'cryptid_id'
});



module.exports = { Spotter, Cryptid, Sighting };
