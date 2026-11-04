module.exports = (objRep) => {
    const { monkeys } = objRep;
    return (req, res, next) => {
        const monkeyIndex = monkeys.indexOf(res.locals.monkey);
        monkeys.splice(monkeyIndex, 1);
        res.locals.deletedMonkeyById = res.locals.monkey;
        return next();
    }
}