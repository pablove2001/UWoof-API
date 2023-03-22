const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const swaggerConf = require('./swagger.config');
const routes = require('./src/routes');
const defaultRoutes = require('./routes');

const app = express();

const mongoUrl = process.env.MONGO_URL;

const port = process.env.PORT || 3000;


const swaggerDocs = swaggerJSDoc(swaggerConf);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use('', routes);
defaultRoutes(app);


mongoose.connect(mongoUrl).then(() => {
    console.log('Successfully connected to the database');

    app.listen(port, function () {
        // console.log(mongoUrl);
        console.log(`App is running in port http://localhost:${port}/`);
    });


}).catch(err => {
    console.log('Could not connect to the database', err);
});