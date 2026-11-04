module.exports = (objRep) => {
    const { bananas } = objRep;

    return (req, res, next) => {
        const monkeyID = res.locals.monkey.id;
        for (let index = bananas.length - 1; index >= 0; index--) {
            if (bananas[index].monkeyId === monkeyID) {
                bananas.splice(index, 1);
            }
        }
        return next();
    };
}