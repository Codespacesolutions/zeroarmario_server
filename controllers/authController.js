const User = require("../models/authModel");

class AuthController {
  async Register(req, res) {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    const exist = await User.findOne({ email: email });
    if (exist) return res.status(400).send("Email id is aldready exist!");
    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
    if(!user) return res.status(500).send("User cannot be created!")
    return res.status(201).send("User created successfully...")
  }
  
}

module.exports = AuthController;
