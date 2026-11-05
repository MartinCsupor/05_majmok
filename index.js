require('dotenv').config();
const { initDatabase } = require('./service/db');
const express = require('express')
const addRoutes = require('./route/index.js');
const app = express()

app.use(express.json());

initDatabase((err, result) => {
    if (err) {
        return console.error(err);
    }
    const { db, monkeysModel, bananasModel } = result;

    addRoutes(app, db, monkeysModel, bananasModel);

    app.use((req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next();   // hadd válaszoljon rá az Express magától
        }
        res.status(404).json({
            error: 'Not found',
            method: req.method,
            path: req.originalUrl
        });
    });

    app.listen(process.env.PORT, function () {
        console.log(`Server running on http://localhost:${process.env.PORT}`)
    });
})

