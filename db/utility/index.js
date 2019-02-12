// article takes slugs from topic and users for author. Needs to convert a time stamp to readable time

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
      ...commentDatum,
      created_at: new Date(commentDatum.created_at)
    };
  });
  return newComments;
};
