const mongoose = require("mongoose");
const pokemon = require("./pokemons.model");

const pokemonsController = {
  getAll: async (req, res) => {
    try {
      const pokemons = await pokemon.find();
      console.log(pokemons);
      res.json(pokemons);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  getOne: async (req, res) => {
    pokemon
      .findById(req.params.id)
      .then((pokemon) => {
        if (pokemon) {
          res.status(200).json(pokemon);
        } else {
          res.status(204).json({ message: "Pokemon not found" });
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
  create: async (req, res) => {
    const newPokemon = new pokemon(req.body);
    newPokemon
      .save()
      .then((pokemon) => {
        res.status(201).json(pokemon);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
  delete: async (req, res) => {
    pokemon
      .findByIdAndDelete(req.params.id)
      .then((pokemon) => {
        if (pokemon) {
          res.status(200).json({ message: "Pokemon deleted" });
        } else {
          res.status(204).json({ message: "Pokemon not found" });
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
  update: async (req, res) => {
    pokemon
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((pokemon) => {
        if (pokemon) {
          res.status(200).json(pokemon);
        } else {
          res.status(204).json({ message: "Pokemon not found" });
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
  getLatest: async (req, res) => {
    pokemon
      .find()
      .sort({ createdAt: -1 })
      .limit(3)
      .then((pokemon) => {
        if (pokemon) {
          res.status(200).json(pokemon);
        } else {
          res.status(204).json({ message: "Pokemon not found" });
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
  getOneByName: async (req, res) => {
    pokemon
      .findOne({ name: { $regex: new RegExp(req.params.name, "i") } })
      .then((pokemon) => {
        if (pokemon) {
          res.status(200).json(pokemon);
        } else {
          res.status(204).json({ message: "Pokemon not found" });
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
};

module.exports = pokemonsController;
