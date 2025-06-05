module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.STRING, unique: true },
    otp: DataTypes.STRING,
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    birthdate: DataTypes.DATEONLY,
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
  });

  User.associate = (models) => {
    User.hasMany(models.Subscription);
  };

  return User;
};
