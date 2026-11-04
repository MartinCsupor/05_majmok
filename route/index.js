const getMonkeys = require('../middleware/monkey/getMonkeys');
const createMonkey = require('../middleware/monkey/createMonkey');
const getMonkey = require('../middleware/monkey/getMonkey');
const deleteMonkey = require('../middleware/monkey/deleteMonkey');
const updateMonkey = require('../middleware/monkey/updateMonkey');
const deleteMonkeyBananas = require('../middleware/monkey/deleteMonkeyBanana');
const getMonkeyIndex = require('../middleware/monkey/getMonkeyIndex');
const getBananas = require('../middleware/banana/getBananas');
const createBanana = require('../middleware/banana/createBanana');
const getBanana = require('../middleware/banana/getBanana');
const deleteBanana = require('../middleware/banana/deleteBanana');
const updateBanana = require('../middleware/banana/updateBanana');
const checkMonkeyId = require('../middleware/banana/checkMonkeyId');
const getBananaIndex = require('../middleware/banana/getBananaIndex');

function addRoutes(app) {

    const objRep = {
        monkeys: [
            {
                id: 1,
                name: 'Joe',
                sex: 'male',
                species: 'gibbon'

            },
            {
                id: 2,
                name: 'Josephine',
                sex: 'female',
                species: 'gorilla'
            },
            {
                id: 3,
                name: 'Lajos',
                sex: 'male',
                species: 'orangutan'
            }
        ],

        bananas: [
            {
                id: 1,
                color: "yellow",
                sweet: false,
                monkeyId: 1
            },
            {
                id: 2,
                color: "yellow",
                sweet: true,
                monkeyId: 1
            },
            {
                id: 3,
                color: "green",
                sweet: true,
                monkeyId: 2
            }, {
                id: 4,
                color: "green",
                sweet: false,
                monkeyId: 3
            }
        ],

        globalMonkeyId: 4,
        globalBananaId: 5,
    }
    app.get('/monkey', getMonkeys(objRep));
    app.post('/monkey', createMonkey(objRep));
    app.get('/monkey/:id', getMonkeyIndex(objRep), getMonkey(objRep));
    app.delete('/monkey/:id', getMonkeyIndex(objRep), deleteMonkeyBananas(objRep), deleteMonkey(objRep));
    app.patch('/monkey/:id', getMonkeyIndex(objRep), updateMonkey(objRep));

    app.get('/banana', getBananas(objRep)); // Minden banán
    app.post('/banana', checkMonkeyId(objRep), createBanana(objRep));
    app.get('/banana/:id', getBananaIndex(objRep), getBanana(objRep));
    app.delete('/banana/:id', getBananaIndex(objRep), deleteBanana(objRep));
    app.patch('/banana/:id', getBananaIndex(objRep), checkMonkeyId(objRep), updateBanana(objRep));

}

module.exports = addRoutes;