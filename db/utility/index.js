exports.formatArticleData = (articlesData) => {
  articlesData.forEach((article) => {
    const time = article.created_at;
    article.created_at = new Date(time);
  });
  return articlesData;
};

exports.formatComments = (commentData, articleData) => {
  const newComments = commentData.map(({ ...commentDatum }) => {
    return {
      body: commentDatum.body,
      created_at: new Date(commentDatum.created_at),
      author: commentDatum.created_by,
      article_id: commentDatum.belongs_to,
      votes: commentDatum.votes
    };
  });
  return newComments;
};

exports.getArticleID = (articles) => {
  articles.map(({ ...article }) => {
    return {
      ...article,
      article_id: 
    }
  });
};
