const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    verificationCode: String, // Código de verificação enviado por e-mail
});

module.exports = mongoose.model("User", UserSchema);
