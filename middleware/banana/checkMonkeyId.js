
module.exports = (objRep) => {
    const { monkeys } = objRep;

    return (req, res, next) => {
        const monkeyId = req.body.monkeyId;
        // nincs megadva vagy null: gazdátlan banán, nincs mit ellenőrizni
        if (monkeyId === undefined || monkeyId === null) {
            return next();
        }
        // csak egész szám lehet
        if (!Number.isInteger(monkeyId)) {
            return res.status(400).json({ error: 'monkeyId must be an integer' });
        }
        // létezik-e ilyen majom
        const monkey = monkeys.find(m => m.id === monkeyId);
        if (monkey === undefined) {
            return res.status(400).json({ error: 'Monkey does not exist' });
        }
        return next();
    }
}