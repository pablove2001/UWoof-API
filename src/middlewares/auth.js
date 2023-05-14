require('dotenv').config();
const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).send('Token missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTKEY);
        console.log('auth22 decode token');
        req.headers.user_id = decoded.id;
        req.headers.role = decoded.role;
        req.headers.name = decoded.name;
        req.headers.last_name = decoded.last_name;
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

function generateToken(payload) {
    const options = { expiresIn: '1d' };
    const token = jwt.sign(payload, process.env.JWTKEY, options);
    return token;
}

function getCredentials(token) {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, process.env.JWTKEY);

        if (decoded.exp < Date.now() / 1000) return null;

        const credentials = { id: decoded.id, role: decoded.role, name: decoded.name, last_name: decoded.last_name }

        return credentials;

    } catch (error) {
        return null;
    }
}

module.exports = { validateToken, generateToken, getCredentials };