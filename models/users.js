const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  username: { type: String, required: true, trim: true },
  password: {
    type: String,
    required: true,
    validate: (value) => {
      if (
        !validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        throw new Error(
          "Password must be strong and contain at least 8 characters. At lease 1 lowercase, 1 uppercase, 1 number and 1 symbol"
        );
      }
    },
  },
  role: { type: String, required: true, default: 'user' },
  createdAt: { type: String, default: Date.now() },
  token: { type: String, trim: true },
});
//Hash password before saving to database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({
    _id: user._id,
    username: user.username,
    role: user.role,
  }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();
  return token;
};
module.exports = mongoose.model("User", userSchema);
