const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;



const database = require('./database');
const db = new database()


app.use(bodyParser.urlencoded({extended: true}))

require('./routes') (app, db);
app.listen(port, () => console.log(`Listening on port ${port}`));


