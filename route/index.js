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

function addRoutes(app, db, monkeysModel, bananasModel) {

    const objRep = {
        db,
        monkeysModel,
        bananasModel,
        uuid,
        globalBananaId: 5,
    }

    app.get('/monkey', getMonkeys(objRep), (req, res) => res.status(200).json(res.locals.monkeys));
    app.post('/monkey', createMonkey(objRep), (req, res) => res.status(200).json(res.locals.monkey));
    app.get('/monkey/:id', getMonkey(objRep), (req, res) => res.status(200).json(res.locals.monkey));
    app.delete('/monkey/:id', getMonkey(objRep), deleteMonkeyBananas(objRep), deleteMonkey(objRep), (req, res) => res.status(200).json({ deletedMonkeyById: res.locals.deletedMonkeyById }));
    app.patch('/monkey/:id', getMonkey(objRep), updateMonkey(objRep), (req, res) => res.status(200).json(res.locals.monkey));

    app.get('/banana', getBananas(objRep), (req, res) => res.status(200).json(res.locals.bananas)); // Minden banán
    app.post('/banana', checkMonkeyId(objRep), createBanana(objRep), (req, res) => res.status(201).json(res.locals.banana));
    app.get('/banana/:id', getBanana(objRep), (req, res) => res.status(200).json(res.locals.banana));
    app.delete('/banana/:id', getBanana(objRep), deleteBanana(objRep), (req, res) => res.status(200).json({ deletedBananaById: res.locals.deletedBananaById }));
    app.patch('/banana/:id', getBanana(objRep), checkMonkeyId(objRep), updateBanana(objRep), (req, res) => res.status(200).json(res.locals.banana));

}

module.exports = addRoutes;