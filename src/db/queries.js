const pool = require('./pool');

const fetchGames = async () => {
	const games = await pool.query("SELECT * FROM games ORDER BY name;");
	const genres = await pool.query("SELECT * FROM genres ORDER BY name;")
	const developers = await pool.query("SELECT * FROM developers ORDER BY name;")
	return { games: games.rows, genres: genres.rows, developers: developers.rows }
}

module.exports = {
	fetchGames
}
