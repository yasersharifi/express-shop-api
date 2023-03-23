class HomeController {
    findAll(req, res) {
        // const error = new Error();
        // error.message = 'Server Failed !';
        // error.status = 510;
        // throw error;
        res.status(200).send('<h1>Home Route !!!</h1>');
    }
}

module.exports = new HomeController();