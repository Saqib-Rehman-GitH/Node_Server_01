const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// "user": {"created_at": "2022-06-08T18:16:49.000000Z", "email": "john93@mailinator.com", "email_verified_at": "2022-06-08T18:17:47.000000Z", "id": 113, "image": "https://payscanme.com/assets/img/person.png", "is_admin": "0", "latest_message": null, "message_sorting": null, "name": "John", "player_id": "bdf66689-1ae4-4b54-9526-8aac4b095d72", "updated_at": "2022-06-08T18:18:17.000000Z"}
const UserModel = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    player_id: {
        default: null,
        type: String
    },
    update_at: {
        default: null,
        type: String
    },
    user_created_at: {
        default: null,
        type: String
    },
    user_verified_at: {
        default: '0',
        type: String
    },
    otp: {
        default: null,
        type: String
    },


})

const UserIdCountModel = new Schema({
    count: Number
})

const SchemaUser = mongoose.model('Users', UserModel);
const SchemaUserIdCount = mongoose.model('UserCounts', UserIdCountModel)
module.exports = { SchemaUser, SchemaUserIdCount }