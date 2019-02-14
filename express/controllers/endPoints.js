const { showEndPoints } = require('../models/showEndPoints');

exports.getEndPoints = (req, res, next) => {
  showEndPoints()
    .then((file) => {
      console.log(file);
    })
    .catch(next);
};
