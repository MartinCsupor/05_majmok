module.exports = (objRep) => {
    const { monkeys } = objRep;
    return (req, res, next) => {
        console.table(monkeys);
        return res.json(monkeys);
    }
}