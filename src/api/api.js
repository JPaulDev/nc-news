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

export async function getArticles() {
  const { data } = await newsApi.get('/articles');
  return data;
}

export async function getArticleById(id) {
  const { data } = await newsApi.get(`/articles/${id}`);
  return data;
}

export async function getArticleComments(id) {
  const { data } = await newsApi.get(`/articles/${id}/comments`);
  return data;
}
