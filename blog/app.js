const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require('./routes/postRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./config/swagger');
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/posts', postRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));


sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected & synced");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
