module.exports = (objRep) => {
    const { bananasModel } = objRep;

    return (req, res, next) => {
        const bananaId = req.params.id;
        const banana = bananasModel.findOne({ id: bananaId });

        if (!banana) {
            return res.status(404).json({ error: `Requested bananaID not found! ${req.params.id}` });
        }

        res.locals.banana = banana;
        return next();
    }
}