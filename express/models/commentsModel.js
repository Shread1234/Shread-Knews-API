const connection = require('../../db/connection');

exports.updateCommentById = (id, newVote) => {
  const comment_id = id.comment_id;
  const voteUpdate = newVote.inc_votes;
  return connection('comments')
    .where('comments.comment_id', '=', comment_id)
    .increment('votes', voteUpdate)
    .returning('*');
};

exports.removeCommentById = (id) => {
  const search_id = id.comment_id;
  return connection('comments')
    .where('comments.comment_id', '=', search_id)
    .delete()
    .returning('*');
};
