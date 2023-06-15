const moongoose = require('mongoose');

const userSchema = moongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: {type: String, required: true, unique: true},
    isAdmin: {type: Boolean, default: false}
});

const userModel = moongoose.model('users', userSchema);

module.exports = userModel;