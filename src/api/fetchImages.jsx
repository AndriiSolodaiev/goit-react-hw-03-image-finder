const API_KEY = '32825730-a8ef2845eee46c8d864ef66d9';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = (nextName, page) => {
  return fetch(
    `${BASE_URL}?q=${nextName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (!res.ok) {
      return Promise.reject(new Error(`Not found`));
    }
    return res.json();
  });
};
