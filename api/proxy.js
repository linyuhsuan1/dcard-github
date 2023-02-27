import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req) => {
  req.send('Mavenlink connector');
});

app.get('/oauth', async (req, res) => {
  try {
    const data = await axios.post('https://github.com/login/oauth/authorize');
    return res.json(data.data);
  } catch (err) {
    console.log('error...', err);
    res.send(err);
  }
});

app.get('/getAccessToken', async (req, res) => {
  const token = req.query.token;
  const client_id = req.query.client_id;
  const client_secret = req.query.client_secret;
  try {
    const param = '?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + token;
    const data = await axios.get('https://github.com/login/oauth/access_token' + param, {
      headers: {
        Accept: 'application/json',
      },
    });
    return res.json(data.data);
  } catch (err) {
    res.send(err);
  }
});
app.get('/repos', async (req, res) => {
  try {
    const owner = req.query.owner;
    const repo = req.query.repo;
    const number = req.query.number;
    const data = await axios.get(
      'https://api.github.com/repos/' + owner + '/' + repo + '/issues/' + number,
      {
        headers: {
          Authorization: 'Bearer ' + req.headers['authorization'],
          Accept: 'application/json',
        },
      },
    );
    return res.json(data.data);
  } catch (err) {
    res.send(err);
  }
});
app.patch('/repos', async (req, res) => {
  try {
    const owner = req.body.query.owner;
    const repo = req.body.query.repo;
    const number = req.body.query.number;
    const newData = req.body.data;
    const data = await axios.patch(
      'https://api.github.com/repos/' + owner + '/' + repo + '/issues/' + number,
      newData,
      {
        headers: {
          Authorization: 'Bearer ' + req.headers['authorization'],
          Accept: 'application/json',
        },
      },
    );
    return res.json(data.data);
  } catch (err) {
    res.send(err);
  }
});

app.get('/search', async (req, res) => {
  console.log('gettttt search data', req.query);
  try {
    const param = req.query.user;
    const page = req.query.page;
    const order = req.query.order;
    const data = await axios.get(
      'https://api.github.com/search/issues?q=user:' +
        param +
        '&per_page=4' +
        '&page=' +
        page +
        '&order=' +
        order,
      {
        headers: {
          Authorization: 'Bearer ' + req.headers['authorization'],
          Accept: 'application/json',
        },
      },
    );
    return res.json(data.data);
  } catch (err) {
    res.send(err);
  }
});

app.listen(3001, () => {
  console.log('server listening on 3001...');
});
