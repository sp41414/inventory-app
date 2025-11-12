const db = require("../db/queries");

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

const getGamesFormPage = (req, res) => {
  res.render("gamesForm");
};

const postGamesFormPage = (req, res) => {
  res.redirect("/");
};

module.exports = {
  getHomePage,
  getGamesPage,
  getGamesFormPage,
  postGamesFormPage,
};
