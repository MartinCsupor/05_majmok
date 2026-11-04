module.exports = (objRep) => {
    const { monkeys } = objRep;
    return (req, res, next) => {
        const monkeyId = Number(req.params.id);
        const monkey = monkeys.find(item => item.id === monkeyId);

        if (!Number.isInteger(monkeyId) || monkey === undefined) {
            return res.status(404).json({ error: `Requested monkeyID not found! ${req.params.id}` });
        }

        res.locals.monkey = monkey;
        return next();
    }
}