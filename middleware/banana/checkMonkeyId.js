module.exports = (objRep) => {
    const { monkeysModel, db } = objRep;

    return (req, res, next) => {
        const monkeyId = req.body.monkeyId;
        // nincs megadva vagy null: gazdátlan banán, nincs mit ellenőrizni
        if (monkeyId === undefined || monkeyId === null) {
            return next();
        }
        if (typeof monkeyId !== 'string' || monkeyId.length === 0) {
            return res.status(400).json({ error: 'monkeyId must be a non-empty string' });
        }
        // létezik-e ilyen majom
        const monkey = monkeysModel.findOne({ id: monkeyId });
        if (!monkey) {
            return res.status(400).json({ error: 'Monkey does not exist' });
        }
        return next();
    }
}