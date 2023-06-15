const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    pokedexNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    types: {
      type: [String],
      required: true,
      enum: [
        "acier",
        "combat",
        "dragon",
        "eau",
        "électrik",
        "feu",
        "fée",
        "glace",
        "insecte",
        "normal",
        "plante",
        "poison",
        "psy",
        "roche",
        "sol",
        "spectre",
        "ténèbres",
        "vol",
      ],
    },
    height: { type: Number },
    weight: { type: Number },
    sprite: { type: String },
  },
  { timestamps: true }
);

const pokemonModel = mongoose.model("pokemons", pokemonSchema);

module.exports = pokemonModel;
