const financeCategory = (sequelize, DataTypes) => {
  const FinanceCategory = sequelize.define("financeCategory", {
    title: {
      type: DataTypes.STRING
    },
    tracked: {
      type: DataTypes.BOOLEAN
    }
  });
  FinanceCategory.associate = models => {
    FinanceCategory.hasMany(models.Finance);
    FinanceCategory.belongsTo(models.User);
  };
  return FinanceCategory;
};

module.exports = financeCategory;
