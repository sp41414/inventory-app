const db = require("../db/queries");

const getHomePage = async (req, res) => {
  const games = await db.fetchGames();
  console.log(games);
  res.render("index", {
    games: games.games,
    genres: games.genres,
    developers: games.developers,
  });
};
const getGamesPage = (req, res) => {
  res.render("games");
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
