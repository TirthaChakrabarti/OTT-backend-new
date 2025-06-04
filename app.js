require("dotenv").config();
const express = require("express");
const app = express();

const db = require("./models");

const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");
// const packageRoutes = require("./routes/package.routes");
// const movieRoutes = require("./routes/movie.routes");

app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/packages", packageRoutes);
// app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 8080;

// sync() creates tables in the DB automatically
// 'alter: true' updates tables without dropping
db.sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
