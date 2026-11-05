module.exports = (objRep) => {
    const { monkeysModel } = objRep;
    return (req, res, next) => {
        res.locals.monkeys = monkeysModel.find();
        return next();
    }
}