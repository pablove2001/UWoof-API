const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const swaggerConf = require('./swagger.config');
const routes = require('./src/routes');
const defaultRoutes = require('./routes');
const { getCredentials } = require('./src/middlewares');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;

const port = process.env.PORT || 3000;


const swaggerDocs = swaggerJSDoc(swaggerConf);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use('', routes);
defaultRoutes(app);


mongoose.connect(mongoUrl).then(() => {
    console.log('Successfully connected to the database');

    const server = app.listen(port, function () {
        // console.log(mongoUrl);
        console.log(`App is running in port http://localhost:${port}/`);
    });

    const io = socketio(server, {
        cors: {
            origin: '*',
            method: ['GET', 'POST']
        }
    });

    io.on('connection', socket => {
        io.emit('Se conecto alguien');
        console.log('se conecto alguien');

        socket.on('sendMessage', (data) => {
            const credentials = getCredentials(data.token);

            if (!credentials) return;

            console.log(credentials);
            console.log({
                message: data.message,
                owned: false, time: new Date(),
                userId: credentials.id,
                name: credentials.name,
                last_name: credentials.last_name,
            });


            socket.broadcast.emit('newMessage', {
                message: data.message,
                owned: false, time: new Date(),
                userId: credentials.id,
                name: credentials.name,
                last_name: credentials.last_name,
            });
        })
    })

}).catch(err => {
    console.log('Could not connect to the database', err);
});

