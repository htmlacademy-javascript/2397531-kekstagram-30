const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST'
};

const Route = {
  GET: '/data',
  POST: '/'
};

const request = (url, method = HttpMethod.GET, body = null) =>
  fetch(`${url}${Route[method]}`, {
    method: method,
    body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error.status);
    });

const getData = () => request(SERVER_URL);

const sendData = (body) => request(SERVER_URL, HttpMethod.POST, body);

export {getData, sendData};
