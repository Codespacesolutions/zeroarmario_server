const mongoose = require("mongoose");

const Session = mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean },
    refreshToken: {
      type: [Session],
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model('User', userSchema)
module.exports = User
