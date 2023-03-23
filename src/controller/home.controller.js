class HomeController {
    findAll(req, res) {
        // const error = new Error();
        // error.message = 'Server Failed !';
        // error.status = 510;
        // throw error;
        res.status(200).json({ route: 'index' });
    }
}

module.exports = new HomeController();