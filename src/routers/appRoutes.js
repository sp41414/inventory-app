const { Router } = require('express')
const controller = require('../controllers/controller.js')

const appRoutes = Router();

appRoutes.get("/", controller.getHomePage);
appRoutes.get("/games", controller.getGamesPage);
appRoutes.get("/games/new", controller.getGamesFormPage);

appRoutes.post("/games/new", (req, res) => {
	console.log("placeholder")
})

module.exports = appRoutes
