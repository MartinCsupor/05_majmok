module.exports = (objRep) => {
    const { monkeys, bananas } = objRep;

    return (req, res, next) => {
        const monkeyID = monkeys[res.locals.monkeyIndex].id;
        for (let index = bananas.length - 1; index >= 0; index--) {
            if (bananas[index].monkeyId === monkeyID) {
                bananas.splice(index, 1);
            }
        }
        return next();
    };
}