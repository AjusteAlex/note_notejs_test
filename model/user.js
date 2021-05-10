const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    roles: [String],
    username: { type: String,  required: true },
    password: { type: String, required: true }
})

userSchema.statics.generatePasswordHash = (password) => {
    const saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};
  
userSchema.statics.validatePassword = (password, hashedPassword) => {
    let res = bcrypt.compareSync(password, hashedPassword);
    return res;
};
  
  
module.exports.User = mongoose.model(
    'User',
    userSchema
)