#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");
const { argv } = require("process");

const SQL = `
	CREATE TABLE IF NOT EXISTS genres (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name VARCHAR(255)
	);

	CREATE TABLE IF NOT EXISTS developers (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name VARCHAR(255),
		company VARCHAR(255)
	);

	CREATE TABLE IF NOT EXISTS games (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name VARCHAR(255),
		genreID INTEGER,
		developerID INTEGER
	);

	INSERT INTO genres (name) VALUES
		('Indie'), ('Action'), ('Adventure'), ('Casual'), ('Singleplayer'),
		('RPG'), ('Simulation'), ('Strategy'), ('2D'), ('3D'),
		('Fantasy'), ('Exploration'), ('Multiplayer'), ('Anime'), ('Sports'),
		('Horror'), ('Sci-fi'), ('PVP'), ('Co-op'), ('FPS'), ('VR'),
		('Romance'), ('Bullet Hell'), ('Trending');

	INSERT INTO developers (name, company)
	VALUES
		('Naughty Dog', NULL),
		('Santa Monica Studio', NULL),
		('Rockstar Games', NULL),
		('Nintendo EPD', NULL),
		('Infinity Ward', 'Activision'),
		('Bungie', NULL),
		('FromSoftware', NULL),
		('Epic Games', NULL),
		('4A Games', NULL),
		('11 Bit Studios', NULL),
		('ArenaNet', 'NCSoft'),
		('Arrowhead Game Studios', NULL),
		('Arkane Studios', 'ZeniMax Media'),
		('Mojang', 'Microsoft Gaming'),
		('Asobo Studio', NULL),
		('Maddy Makes Games', NULL),
		('Capcom', NULL),
		('CD Projekt Red', NULL),
		('Atlus', 'Sega');

	INSERT INTO games (name, genreID, developerID)
	VALUES
		('The Last of Us', (SELECT id FROM genres WHERE name = 'Action'), (SELECT id FROM developers WHERE name = 'Naughty Dog')),
		('God of War', (SELECT id FROM genres WHERE name = 'Action'), (SELECT id FROM developers WHERE name = 'Santa Monica Studio')),
		('Grand Theft Auto V', (SELECT id FROM genres WHERE name = 'Action'), (SELECT id FROM developers WHERE name = 'Rockstar Games')),
		('The Legend of Zelda: Breath of the Wild', (SELECT id FROM genres WHERE name = 'Adventure'), (SELECT id FROM developers WHERE name = 'Nintendo EPD')),
		('Call of Duty', (SELECT id FROM genres WHERE name = 'FPS'), (SELECT id FROM developers WHERE name = 'Infinity Ward')),
		('Halo', (SELECT id FROM genres WHERE name = 'FPS'), (SELECT id FROM developers WHERE name = 'Bungie')),
		('Elden Ring', (SELECT id FROM genres WHERE name = 'RPG'), (SELECT id FROM developers WHERE name = 'FromSoftware')),
		('Fortnite', (SELECT id FROM genres WHERE name = 'Action'), (SELECT id FROM developers WHERE name = 'Epic Games')),
		('Metro Exodus', (SELECT id FROM genres WHERE name = 'FPS'), (SELECT id FROM developers WHERE name = '4A Games')),
		('Frostpunk', (SELECT id FROM genres WHERE name = 'Strategy'), (SELECT id FROM developers WHERE name = '11 Bit Studios')),
		('Guild Wars 2', (SELECT id FROM genres WHERE name = 'RPG'), (SELECT id FROM developers WHERE name = 'ArenaNet')),
		('Helldivers 2', (SELECT id FROM genres WHERE name = 'Action'), (SELECT id FROM developers WHERE name = 'Arrowhead Game Studios')),
		('Dishonored', (SELECT id FROM genres WHERE name = 'Action'), (SELECT id FROM developers WHERE name = 'Arkane Studios')),
		('This War of Mine', (SELECT id FROM genres WHERE name = 'Simulation'), (SELECT id FROM developers WHERE name = '11 Bit Studios')),
		('Minecraft', (SELECT id FROM genres WHERE name = 'Adventure'), (SELECT id FROM developers WHERE name = 'Mojang')),
		('A Plague Tale: Innocence', (SELECT id FROM genres WHERE name = 'Adventure'), (SELECT id FROM developers WHERE name = 'Asobo Studio')),
		('Celeste', (SELECT id FROM genres WHERE name = 'Indie'), (SELECT id FROM developers WHERE name = 'Maddy Makes Games')),
		('Street Fighter 6', (SELECT id FROM genres WHERE name = 'Action'), (SELECT id FROM developers WHERE name = 'Capcom')),
		('Cyberpunk 2077', (SELECT id FROM genres WHERE name = 'RPG'), (SELECT id FROM developers WHERE name = 'CD Projekt Red')),
		('Persona 5', (SELECT id FROM genres WHERE name = 'RPG'), (SELECT id FROM developers WHERE name = 'Atlus'));
`;

async function main() {
	const client = new Client({ connectionString: process.env.DBURL || argv[2] });
	await client.connect();
	try {
		await client.query(SQL);
	} catch (err) {
		console.error(err);
	} finally {
		await client.end();
	}
	console.log("done");
}

main();
