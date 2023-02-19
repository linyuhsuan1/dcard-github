import express from 'express';
import bodyParser from  'body-parser'
import axios from 'axios';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('dev'));

const CLIENT_ID="1af846cd38b372da682e";
const CLIENT_SECRET="a6e1835a7133dfec59858d01adf379d9bf478e85&code";

app.get('/', (req) => {
  console.log('qqqq', req)
  req.send('Mavenlink connector');
});

app.get('/oauth', async (req, res) => {
  console.log('aaaa', req)
  const data = await axios.post('https://github.com/login/oauth/authorize')
  return res.json(data.data);
})

app.get('/getAccessToken', async (req, res) => {
  console.log('aaaa', req.query.code)
  const param = "?client_id="+ CLIENT_ID +"&client_secret="+CLIENT_SECRET+"&code="+req.query.code;
  const data = await axios.get('https://github.com/login/oauth/access_token'+param,{
    headers: {
      Accept: 'application/json'
    }});
  return  res.json(data.data);
})
app.get('/repos', async (req, res) => {
  console.log('gettttt orgs',req.query)
  const owner =  req.query.owner;
  const repo = req.query.repo;
  const number = req.query.number;
  const data = await axios.get('https://api.github.com/repos/'+owner+'/'+repo+'/issues/'+number,
  {
    headers: {
      // "Authorization": param,
      "Accept":"application/json",
    }}
    );
  return  res.json(data.data);
})
app.patch('/repos', async (req, res) => {
  console.log('gettttt  patch orgs',req.query)
  const owner =  req.query.owner;
  const repo = req.query.repo;
  const number = req.query.number;
  const newData = req.body;
  console.log('ssssss',newData)
  console.log('dddddddddd',req.body.authToken)
  const data = await axios.patch('https://api.github.com/repos/'+owner+'/'+repo+'/issues/'+number,newData,
  {
    headers: {
      "Authorization": "Bearer " + req.body.authToken,
      "Accept":"application/json",
    }}
    );
  return  res.json(data.data);
})

app.get('/search', async (req, res) => {
  console.log('gettttt search data',req.query)
  const param =  req.query.user;
  const page = req.query.page;
  const order = req.query.order
  const data = await axios.get('https://api.github.com/search/issues?q=user:'+param+'&per_page=4'+'&page='+page+'&order='+order,
  {
    headers: {
      "Accept":"application/json",
    }}
    );
  return  res.json(data.data);
})

app.listen(3001, () => {
  console.log('server listening on 3001...')
})
