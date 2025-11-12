const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const lenErr = "must be between 1 and 20 characters";
const matchErr = "must contain only letters, numbers, and spaces";

const validateMessage = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Name ${lenErr}`)
    .matches(/^[a-zA-Z0-9 ]*$/)
    .withMessage(`Name ${matchErr}`),
  body("developer")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Developer ${lenErr}`)
    .matches(/^[a-zA-Z0-9 ]*$/)
    .withMessage(`Developer ${matchErr}`),
  body("company")
    .trim()
    .optional()
    .if(body("company").notEmpty())
    .isLength({ min: 1, max: 20 })
    .withMessage(`Company ${lenErr}`)
    .matches(/^[a-zA-Z0-9 ]*$/)
    .withMessage(`Company ${matchErr}`),
  body("admin")
    .trim()
    .custom((value) => {
      if (value !== process.env.ADMIN_PASS) {
        throw new Error("Invalid Admin Password");
      }
      return true;
    }),
];

const getHomePage = async (req, res) => {
  res.render("index");
};
const getGamesPage = async (req, res) => {
  let games;

  if (Object.keys(req.query).length > 0) {
    const genreIDs = Object.keys(req.query).map(Number);
    games = await db.fetchGamesByGenreID(genreIDs);
  } else {
    games = await db.fetchGames();
  }

  res.render("games", {
    games: games.games,
    genres: games.genres,
    developers: games.developers,
  });
};
const getGamesFormPage = async (_, res) => {
  const genres = await db.fetchGenres();
  res.render("gamesForm", { genres: genres });
};

const postGamesFormPage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    const genres = await db.fetchGenres();
    if (!errors.isEmpty()) {
      return res.render("gamesForm", { genres: genres, errors: errors.errors });
    }
    await db.appendGame({
      name: req.body.name,
      genre: req.body.genre,
      developer: req.body.developer,
      company: req.body.company,
    });
    res.redirect("/");
  },
];

module.exports = {
  getHomePage,
  getGamesPage,
  getGamesFormPage,
  postGamesFormPage,
};
