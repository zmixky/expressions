const express = require('express');
const bodyParser = require('body-parser');
const { mainRouter } = require('./routes');

const PORT = 3030;

const app = express();

app.use(bodyParser.json());

app.use('/', mainRouter);

app.use((err, req, res, next) => {
    if (err) {
        console.log(err);

        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log('...server has been started...');
});