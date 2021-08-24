const seed = require('../seed/database-seed');

exports.dbSeed = async (req, res) => {
  console.log('Database seed executed...');
  try {
    seed.dropCollections();
    return res.end('<h1>Database seeded...</h1>');
  } catch (e) {
    console.log(e);
  }
};
