module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define("Package", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
  });

  Package.associate = (models) => {
    Package.hasMany(models.Subscription);
  };

  return Package;
};
