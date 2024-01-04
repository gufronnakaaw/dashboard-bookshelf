import axios from 'axios';

export default function fetcher(url, method, data) {
  const options = {
    url: `http://localhost:3001${url}`,
    method,
  };

  if (data) {
    return axios({
      ...options,
      data,
    });
  }

  return axios(options);
}
