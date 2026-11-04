module.exports = (objRep) => {
    const { bananas } = objRep;

    return (req, res, next) => {
        const bananaIndex = bananas.indexOf(res.locals.banana);
        bananas.splice(bananaIndex, 1);
        res.locals.deletedBananaById = res.locals.banana;
        return next();
    }
}