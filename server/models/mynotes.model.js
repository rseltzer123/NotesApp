module.exports = (sequelize, Sequelize) => {
    const mynotes = sequelize.define("mynotes", {
        body: {
            type: Sequelize.STRING
        }
    });
    return mynotes;
}