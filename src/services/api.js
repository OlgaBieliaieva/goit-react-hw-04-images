import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';

const REQUEST_OPTIONS = {
  key: '34369155-5d93acadffc22e75da017de5a',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

async function getImages(query, page) {
  REQUEST_OPTIONS.q = query.toLowerCase().trim();
  REQUEST_OPTIONS.page = page;

  const options = new URLSearchParams(REQUEST_OPTIONS);

  try {
    const response = await axios.get(`${BASE_URL}${options}`);

    return response;
  } catch (error) {
    console.log(error.message);
  }
}

export default getImages;
