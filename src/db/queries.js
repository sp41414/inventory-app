const pool = require("./pool");

const fetchGames = async () => {
  const games = await pool.query("SELECT * FROM games ORDER BY name;");
  const genres = await pool.query("SELECT * FROM genres ORDER BY name;");
  const developers = await pool.query(
    "SELECT * FROM developers ORDER BY name;"
  );
  return {
    games: games.rows,
    genres: genres.rows,
    developers: developers.rows,
  };
};

const fetchGamesByGenreID = async (ids) => {
  const games = await pool.query(
    "SELECT * FROM games WHERE genreID=ANY($1) ORDER BY name;",
    [ids]
  );
  const genres = await pool.query("SELECT * FROM genres ORDER BY name;");
  const developers = await pool.query(
    "SELECT * FROM developers ORDER BY name;"
  );
  return {
    games: games.rows,
    genres: genres.rows,
    developers: developers.rows,
  };
};

const fetchGenres = async () => {
  const genres = await pool.query("SELECT * FROM genres ORDER BY name;");
  return genres.rows;
};

const appendGame = async ({ name, developer, genre, company }) => {
  // check if developer already exists
  let devResult = await pool.query(
    "SELECT id FROM developers WHERE name = $1;",
    [developer]
  );

  if (devResult.rows.length === 0) {
    // if not, add the developer
    devResult = await pool.query(
      "INSERT INTO developers (name, company) VALUES ($1, $2) RETURNING id;",
      [developer, company]
    );
  }
  // then add the game, link the genre's id and link the developer's id (^^^) to it
  await pool.query(
    "INSERT INTO games (name, genreID, developerID) VALUES ($1, (SELECT id FROM genres WHERE genres.id = $2), $3);",
    [name, genre, devResult.rows[0].id]
  );
};

const deleteGameByID = async (id) => {
  await pool.query("DELETE FROM games WHERE id=$1", [id]);
};

module.exports = {
  fetchGames,
  fetchGamesByGenreID,
  fetchGenres,
  appendGame,
  deleteGameByID,
};
