module.exports = (objRep) => {
    const { bananas } = objRep;

    return (req, res, next) => {
        const bananaId = Number(req.params.id);
        const banana = bananas.find(item => item.id === bananaId);

        if (!Number.isInteger(bananaId) || banana === undefined) {
            return res.status(404).json({ error: `Requested bananaID not found! ${req.params.id}` });
        }

        res.locals.banana = banana;
        return next();
    }
}