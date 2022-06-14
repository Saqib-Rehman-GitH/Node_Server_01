const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const secretKey = "VS8GYgqXF86RrhXyIs5IJpXimiwJ5RI3";

const log = text => console.log(text);

module.exports = {
    requestToken: async (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const options = {
                expiresIn: "365 days",
                issuer: "darwin studios",
                audience: userId
            }
            JWT.sign(payload, secretKey, options, (error, token) => {
                if (error) reject({ error: createError.Unauthorized() })
                resolve(token);
            })
        })
    },
    verifyToken: async (req, res, next) => {
        let auth = req?.headers['authorization']
        if (!auth) return createError.Unauthorized();
        let token = auth.split(" ")[1];
        JWT.verify(token, secretKey, (error, payload) => {
            if (error) return createError.Unauthorized();
            log("JWT.verify => payload =>  " , JSON.stringify(payload))
        })
        next(req,res,next);
    }

}