import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://news-api-sjab.onrender.com/api',
});

export async function getUsers() {
  const { data } = await newsApi.get(`/users`);
  return data;
}

export async function getTopics() {
  const { data } = await newsApi.get('/topics');
  return data;
}

export async function getArticles({ topic, sort_by, order }) {
  const { data } = await newsApi.get('/articles', {
    params: {
      topic,
      sort_by,
      order,
    },
  });

  return data;
}

export async function getArticleById(id) {
  const { data } = await newsApi.get(`/articles/${id}`);
  return data;
}

export async function updateArticleLikes(id, likes) {
  const { data } = await newsApi.patch(`/articles/${id}`, likes);
  return data;
}

export async function getArticleComments(id) {
  const { data } = await newsApi.get(`/articles/${id}/comments`);
  return data;
}

export async function postArticleComment(id, comment) {
  const { data } = await newsApi.post(`/articles/${id}/comments`, comment);
  return data;
}

export async function deleteArticleComment(id) {
  await newsApi.delete(`/comments/${id}`);
}
