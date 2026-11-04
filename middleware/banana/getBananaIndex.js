module.exports = (objRep) => {
    const { bananas } = objRep;

    return (req, res, next) => {
        const bananaId = Number(req.params.id);
        const bananaIndex = bananas.findIndex(banana => banana.id === bananaId);

        if (!Number.isInteger(bananaId) || bananaIndex === -1) {
            return res.status(404).json({ error: `Requested bananaID not found! ${req.params.id}` });
        }

        res.locals.bananaIndex = bananaIndex;
        return next();
    };
};