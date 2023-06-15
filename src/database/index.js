const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connecté à la base de données");
    })
    .catch((err) => {
      console.log("Erreur lors de la connxion à la base de données", err);
    });
};

module.exports = connect;
