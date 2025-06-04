module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    birthdate: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    status: { type: DataTypes.INTEGER, defaultValue: 1 },
  });

  User.associate = (models) => {
    User.hasMany(models.Subscription);
  };

  return User;
};
