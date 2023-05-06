require('dotenv').config();

function validateToken (req, res, next) {
    if(req.query.token === '123') {
        req.usuario = 'Francisco';
        next();
    } else {
        res.status(401).send('Usuario no autenticado');
    }
}

function generateToken (payload) {
    const options = { expiresIn: '1d' };
    const token = jwt.sign(payload, process.env.JWTKEY, options);
    return token;
}

module.exports = { validateToken, generateToken };