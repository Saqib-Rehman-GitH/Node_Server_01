const express = require('express');
const app = express.Router();
const SchemaUser = require('../../Model/SchemaUser').SchemaUser
const SchemaUser = require('../../Model/SchemaUser').SchemaUserIdCount
const httpErrors = require('http-errors');
const nodemailer = require('nodemailer');
const { SchemaUserIdCount } = require('../../Model/SchemaUser');

//Send 
// db.users.find().limit(1).sort({$natural:-1}) // Last Saved User.
app.post('/register', async (req, res, next) => {
    try {
        const { email, password, name, password_confirmation } = req.body;
        if (!email || !password || !name || !password_confirmation) throw httpErrors.BadRequest()
        if (!email.includes('@') || !email.includes('.com')) throw httpErrors.Conflict('Incorrect Email.')
        if (password != password_confirmation) throw httpErrors.Conflict(`passwords missmatches.`)
        var isUser = await SchemaUser.findOne({ email });
        console.log(`isUser = ${isUser}`)
        if (isUser) throw httpErrors.Conflict(`email  ${email} already exists.`)
        const otp = genrateOTP();
        // player_id : {
        //     type:String
        // },
        // update_at:{
        //     type:String
        // },
        // user_created_at:{
        //     type:String
        // },
        // user_verified_at:{
        //     type:String
        // },
        // otp:{
        //     type:String
        // },
        const user = new SchemaUser({
            name: name,
            email: email,
            password: password,
            otp: otp,
            user_created_at: `${Date.now()}`,
            player_id: null,
            update_at: `${Date.now()}`,
            user_verified_at: '0'
        });
        const savedUser = await user.save();
        console.log(`SAved User => ${savedUser}`)
        // setTimeout(() => {
        //     sendMail({
        //         to: email,
        //         subject: "An Email to verify  the Account",
        //         message: `Please fill with this OTP ${otp} to Verify Account`
        //     }).then(({ data, error }) => {
        //         console.log(`sendMail-Data ${data}`)
        //     })
        // }, 100)

        // if (savedUser) {
        // setTimeout()
        res.send({ otp });
        // }

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
    return otp;
}

//options
// {
//     to:'sa.reh0071@gmail.com',
//     subject:"Subject of Mail",
//     text: "it's the otp"
// }
async function getId(){
    const id = SchemaUserIdCount.u
}

const sendMail = async (options) => {

    return new Promise((resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: "saqibrehman903@gmail.com",
                    pass: "Narutouzumaki@12!"
                }
            })
            const optionHelper = {
                from: "saqibrehman035@outllok.com",
            }
            transporter.sendMail({ ...options, ...optionHelper })
            resolve({ data: "Email Sent Successfully", error: undefined })
        } catch (e) {
            console.log(`SendEmail_Error => ${e}`)
            reject({ data: undefined, error: e })
        }
    })


}

module.exports = app;