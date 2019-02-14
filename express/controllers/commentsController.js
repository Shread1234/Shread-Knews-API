const { updateCommentById } = require('../models/commentsModel');

exports.patchCommentById = (req, res, next) => {
  const newVote = req.body;
  const id = req.params;
  updateCommentById(id, newVote)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
