module.exports = (objRep) => {
    const { monkeys } = objRep;

    return (req, res, next) => {
        const monkeyId = Number(req.params.id);
        const monkeyIndex = monkeys.findIndex(monkey => monkey.id === monkeyId);

        if (!Number.isInteger(monkeyId) || monkeyIndex === -1) {
            return res.status(404).json({ error: `Requested monkeyID not found! ${req.params.id}` });
        }

        res.locals.monkeyIndex = monkeyIndex;
        return next();
    };
};