import { createRequire } from "module";
const require = createRequire(import.meta.url);

import weatherRouter  from './routes/weather.js'
const cors = require('cors');

const express = require('express');
const port = 4000 || process.env.port;
const app = express();

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', weatherRouter);

app.listen(port, (err, res) => {
    if (err) throw err
    console.log('server is listening on ' + port);
})