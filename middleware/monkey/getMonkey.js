module.exports = (objRep) => {
    const { monkeysModel } = objRep;

    return (req, res, next) => {

        const monkey = monkeysModel.findOne({ id: req.params.id });

        if (!monkey) {
            return res.status(404).json({ error: `Requested monkey not found! ${req.params.id}` });
        }

        res.locals.monkey = monkey;
        return next();
    }
}