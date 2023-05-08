require('dotenv').config();
const jwt = require('jsonwebtoken');

function validateToken (req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).send('Token missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTKEY);
        console.log('auth22 decode token');
        req.headers.user_id = decoded.id;
        req.headers.role = decoded.role;
        console.log(req.headers.user_id, req.headers.role);
        if (decoded.exp < Date.now() / 1000) {
            console.log('el token ha expirado');
            return res.status(401).send('El token ha expirado');
        }
        console.log('sale del middleware auth');
        next();
    } catch (error) {
        return res.status(401).send('Token invalid');
    }
}

function generateToken (payload) {
    const options = { expiresIn: '1d' };
    const token = jwt.sign(payload, process.env.JWTKEY, options);
    return token;
}

module.exports = { validateToken, generateToken };