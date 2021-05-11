const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true, trim: true }
    })

userSchema.statics.generatePasswordHash = (password) => {
    const saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

userSchema.statics.validatePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};


module.exports = mongoose.model('User', userSchema)

