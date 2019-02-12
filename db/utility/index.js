exports.formatArticleData = (articlesData) => {
  articlesData.forEach((article) => {
    const time = article.created_at;
    article.created_at = new Date(time);
  });
  return articlesData;
};

// this function renaming properties probably isn't right
exports.formatComments = (commentData, articleData) => {
  const getArticleID = articleData.find((article) => {
    return article.author === commentData.belongs_to;
  });
  const newComments = commentData.map(({ ...commentDatum }) => {
    return {
      body: commentDatum.body,
      created_at: new Date(commentDatum.created_at),
      author: commentDatum.created_by,
      article_id: getArticleID,
      votes: commentDatum.votes
    };
  });
  return newComments;
};

// reference article data to user name and topics slug -  reduce?

// will need to take in users, topics and articles?
