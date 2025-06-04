module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("Subscription", {
    status: { type: DataTypes.STRING, defaultValue: "active" },
    expiryDate: DataTypes.DATE,
  });

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.User);
    Subscription.belongsTo(models.Package);
  };

  return Subscription;
};
