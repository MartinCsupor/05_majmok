module.exports = (objRep) => {
    const { bananasModel } = objRep;

    return (req, res, next) => {
        res.locals.bananas = bananasModel.find();
        return next();
    }
}