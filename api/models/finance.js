const finance = (sequelize, DataTypes) => {
  const Finance = sequelize.define("finance", {
    rent: {
      type: DataTypes.INTEGER
    },
    savings: {
      type: DataTypes.INTEGER
    },
    income: {
      type: DataTypes.INTEGER
    },
    timespan: {
      type: DataTypes.ENUM('day', 'month', 'year')
    }
  });
  Finance.associate = models => {
    Finance.belongsTo(models.User);
  };
  return Finance;
};

module.exports = finance;
