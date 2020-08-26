const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

module.exports = function auth(req, res, next) {
    const token = req.header('access-key');
    if (!token) return res.status(401).send('Access Denied!');
    Admin.findToken(token, async (err, data) => {
        if (data) {
            next()
        } else {
            res.status(401).send('unauthorized')
        }
    })

    // try {
    //     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //     req.user = verified;
    //     next();
    // } catch (err) {
    //     res.status(400).send(err)
    // }
}