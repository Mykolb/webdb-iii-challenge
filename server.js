const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

//router
const cohortsRouter = require('./routes/cohorts-router');
const studentsRouter = require('./routes/students-router');
const server = express();


server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>We have data showing!</h2>
    <p>I hope...</p>
    `)
});

module.exports = server;