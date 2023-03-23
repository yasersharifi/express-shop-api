class HomeController {
    findAll(req, res) {
        res.status(200).send('<h1>Home Route !!!</h1>');
    }
}

module.exports = new HomeController();