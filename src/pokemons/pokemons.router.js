const router = require("express").Router();

const pokemonController = require("./pokemons.controller");

const verifyJWT = require("../middleware/verifyJWT");

router.get("/", pokemonController.getAll);

router.get("/latest/", pokemonController.getLatest);

router.get("/:id", pokemonController.getOne);

router.get("/name/:name", pokemonController.getOneByName);

router.post("/", verifyJWT, pokemonController.create);

router.delete("/:id", verifyJWT, pokemonController.delete);

router.patch("/:id", verifyJWT, pokemonController.update);

module.exports = router;
