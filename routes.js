module.exports = function (app) {
    app.get('/', function (req, res) {
        res.status(200).json({ message: 'Home route' });
    });

    app.get('*', function (req, res) {
        res.status(404).send('Route not found');
    });
}
