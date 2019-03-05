exports.topicFormatter = (topicData) =>
  topicData.map((topic) => ({
    slug: topic.slug,
    description: topic.description
  }));

exports.userFormatter = (userData) =>
  userData.map((user) => ({
    username: user.username,
    avatar_url: user.avatar_url,
    name: user.name
  }));

exports.formatArticleData = (articlesData, topicData, userData) =>
  articlesData.map((article) => ({
    author: userData.find((user) => user.username === article.author).username,
    title: article.title,
    body: article.body,
    votes: article.votes,
    topic: topicData.find((topic) => topic.slug === article.topic).slug,
    created_at: new Date(article.created_at).toUTCString()
  }));

exports.formatComments = (commentData, articlesData, userData) =>
  commentData.map((comment) => ({
    author: userData.find((user) => user.username === comment.created_by)
      .username,
    article_id: articlesData.find(
      (article) => article.title === comment.belongs_to
    ).article_id,
    votes: comment.votes,
    created_at: new Date(comment.created_at).toUTCString(),
    body: comment.body
  }));
