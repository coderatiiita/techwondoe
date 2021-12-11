const express = require('express');
const path = require('path');
var genuuid = require('uuid').v4;
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

const api = require('./server/api');
const db = require('./server/db');

//Configure .env
require('dotenv').config();

//Set port as process.env.PORT if it is present otherwise set it to 4000
const port = process.env.PORT || 4000;

//Initiate connection with database
db.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).then(() => {
    //Handle /api with the api middleware
    app.use('/api', api);

    //Return index.html for routes not handled by build folder
    app.get('*', function (req, res) {
        res.status(200).send({ "message": "Techwondoe Assignment" });
    });

    //Start listening on port
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    });
});