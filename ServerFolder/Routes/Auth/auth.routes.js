const express = require('express');
const app = express.Router();
const SchemaUser = require('../../Model/SchemaUser')
const httpErrors = require('http-errors');

app.post('/register', async (req, res, next) => {
    try {
        const { email, password, name, password_confirmation } = req.body;
        if (!email || !password || !name || !password_confirmation) throw httpErrors.BadRequest()
        if (!email.includes('@') || !email.includes('.com')) throw httpErrors.Conflict('Incorrect Email.')
        if (password != password_confirmation) throw httpErrors.Conflict(`passwords missmatches.`)
        const isUser = SchemaUser.findOne({ email });
        if (isUser) throw httpErrors.Conflict(`email  ${email} already exists.`)
        const user = new SchemaUser({ email, password });
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (e) {
        next(e);
    }
});

app.post('/login', async (req, res, next) => {
    try {
        const { email, passowrd } = req.body;
        let isUser = SchemaUser.findOne({ email }, { "_id": 0, "__v": 0 });
        if (!isUser) throw httpErrors.Conflict(`No User Found with email`);
        res.send(isUser);
    } catch (error) {
        next(error);
    }
})


const genrateOTP = () => {
    const otp = `${Math.floor(1000 + Math.random() * 1000)}`
    
}

module.exports = app;