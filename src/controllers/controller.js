const db = require("../db/queries");

const getHomePage = async (req, res) => {
  res.render("index");
};
const getGamesPage = async (req, res) => {
  const games = await db.fetchGames();
  console.log(games);
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
