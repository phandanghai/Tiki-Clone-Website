const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
   bodyParser.json({
      limit: '50mb',
   }),
);

app.use(cookieParser());

const connection = require('./database/index');
const route = require('./routes/index');
app.use(
   cors({
      origin: ['http://localhost:5173', 'https://jws6xrwo-9io7nrnw-gquf98me6r0j.ac2-preview.marscode.dev'],
      credentials: true,
   }),
);

route(app);
app.use('/', (req, res) => {
   return res.send({
      cookieParser: req.cookies.userData,
   });
});

app.listen(3000, () => {
   console.log('Server running on port 3000');
});
