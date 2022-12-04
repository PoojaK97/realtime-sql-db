module.exports = (sequelize, Sequelize) => {
    const Pitch = sequelize.define("pitch", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        idea: {
            type: Sequelize.STRING
        },
        entrepreneur: {
            type: Sequelize.STRING
        },
        askAmount: {
            type: Sequelize.NUMBER
        },
        equity: {
            type: Sequelize.BOOLEAN
        }
    });

    return Pitch;
};
