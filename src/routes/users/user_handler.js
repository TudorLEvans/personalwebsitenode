const jwt = require('jsonwebtoken')
const { secret } = require('../../../config/local.js')
const databaseHandler = require('../../lib/db')
const crypto = require('crypto')

const login = async (req,res,next) => {
    try {
        const { params } = req.body;
        password = crypto
            .createHmac('sha256', secret)
            .update(params[1])
            .digest('hex')
        const result = await databaseHandler('checkLogin',[params[0],password])
        console.log(result)
        if (result.error) {
            res.status(result.status)
        } else {
            const token = await jwt.sign(result, secret, {
                expiresIn: '8h'
            });
            res.send(200, { token, userId: result.userId, role: result.role});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500);
        next();
    }
}

module.exports = {
    login,
}