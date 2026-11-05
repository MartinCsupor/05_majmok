const uuid = require('uuid');
const getMonkeys = require('../middleware/monkey/getMonkeys');
const createMonkey = require('../middleware/monkey/createMonkey');
const getMonkey = require('../middleware/monkey/getMonkey');
const deleteMonkey = require('../middleware/monkey/deleteMonkey');
const updateMonkey = require('../middleware/monkey/updateMonkey');
const deleteMonkeyBananas = require('../middleware/monkey/deleteMonkeyBanana');
const getBananas = require('../middleware/banana/getBananas');
const createBanana = require('../middleware/banana/createBanana');
const getBanana = require('../middleware/banana/getBanana');
const deleteBanana = require('../middleware/banana/deleteBanana');
const updateBanana = require('../middleware/banana/updateBanana');
const checkMonkeyId = require('../middleware/banana/checkMonkeyId');
const renderMW = require('../middleware/render');

function addRoutes(app, db, monkeysModel, bananasModel) {

    const objRep = {
        db,
        monkeysModel,
        bananasModel,
        uuid,
        globalBananaId: 5,
    }

    app.get('/', (req, res) => res.redirect('/monkeys'));
    app.get('/monkeys', getMonkeys(objRep), getBananas(objRep), renderMW(objRep, 'monkeys'));
    app.get('/bananas', getMonkeys(objRep), getBananas(objRep), renderMW(objRep, 'bananas'));
    app.get('/newmonkey', getMonkeys(objRep), renderMW(objRep, 'newmonkey'));
    app.post('/newmonkey', createMonkey(objRep), (req, res) => res.redirect('/'));
    app.get('/editmonkey/:id', getMonkey(objRep), renderMW(objRep, 'editmonkey'));
    app.post('/editmonkey/:id', getMonkey(objRep), updateMonkey(objRep), (req, res) => res.redirect('/monkeys'));

    app.get('/api/monkey', getMonkeys(objRep), (req, res) => res.status(200).json(res.locals.monkeys));
    app.post('/api/monkey', createMonkey(objRep), (req, res) => res.status(200).json(res.locals.monkey));
    app.get('/api/monkey/:id', getMonkey(objRep), (req, res) => res.status(200).json(res.locals.monkey));
    app.delete('/api/monkey/:id', getMonkey(objRep), deleteMonkeyBananas(objRep), deleteMonkey(objRep), (req, res) => res.status(200).json({ deletedMonkeyById: res.locals.deletedMonkeyById }));
    app.patch('/api/monkey/:id', getMonkey(objRep), updateMonkey(objRep), (req, res) => res.status(200).json(res.locals.monkey));

    app.get('/api/banana', getBananas(objRep), (req, res) => res.status(200).json(res.locals.bananas)); // Minden banán
    app.post('/api/banana', checkMonkeyId(objRep), createBanana(objRep), (req, res) => res.status(201).json(res.locals.banana));
    app.get('/api/banana/:id', getBanana(objRep), (req, res) => res.status(200).json(res.locals.banana));
    app.delete('/api/banana/:id', getBanana(objRep), deleteBanana(objRep), (req, res) => res.status(200).json({ deletedBananaById: res.locals.deletedBananaById }));
    app.patch('/api/banana/:id', getBanana(objRep), checkMonkeyId(objRep), updateBanana(objRep), (req, res) => res.status(200).json(res.locals.banana));

}

module.exports = addRoutes;