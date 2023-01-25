const url = require('url');
const http = require('http');

const PORT = 2000;

const users = [
  {
    id: 1,
    nama: 'udin',
    email: 'udin@mail.com',
  },
  {
    id: 2,
    nama: 'sasuke',
    email: 'sasuke@mail.com',
  },
];

http
  .createServer((req, res) => {
    const httpMethod = req.method;
    const parsedURL = url.parse(req.url, true);
    const path = parsedURL.path.split('/')[1];
    console.log(path);

    if (httpMethod == 'GET') {
      if (path == 'users') {
        res.write(JSON.stringify(users));
        res.end();
      } else {
        res.statusCode = 400; //bad request
        res.end('path not found');
      }
    } else if (httpMethod == 'POST') {
      if (path == 'users') {
        let resData = '';
        req.on('data', (data) => {
          console.log(data);
          console.log(data.toString());
          resData += data;
          users.push(JSON.parse(resData));
        });
        res.statusCode = 201;
        res.end('new data created');
      }
    }
  })
  .listen(PORT, () => {
    console.log('server is running on PORT ' + PORT);
  });
