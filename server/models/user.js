const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: String,
    native: String,
    target: String,
    email: String,
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

  

const User = mongoose.model('User', userSchema);
module.exports = User;
