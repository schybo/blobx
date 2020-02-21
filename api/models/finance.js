const finance = (sequelize, DataTypes) => {
  const Finance = sequelize.define("finance", {
    title: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM('debit', 'credit', 'savings')
    },
    currency: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.INTEGER
    },
    active: {
      type: DataTypes.BOOLEAN
    },
    tracked: {
      type: DataTypes.BOOLEAN
    },
    timespan: {
      type: DataTypes.ENUM('once', 'day', 'month', 'year')
    }
  });
  Finance.associate = models => {
    Finance.belongsTo(models.User);
  };
  return Finance;
};

module.exports = finance;
