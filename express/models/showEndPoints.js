const fs = require('fs');

exports.showEndPoints = (cb) => {
  fs.readFile('../endpoints.json', 'utf8', (err, file) => {
    if (err) {
      cb(err);
    } else {
      cb(null, file);
    }
  });
};
