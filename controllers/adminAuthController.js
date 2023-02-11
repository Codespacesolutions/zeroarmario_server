const Admin = require("../models/adminModel");
const {
  get_token,
  get_refresh_token,
  PASSWORD_SECRET,
} = require("../libs/libs");
const cryptojs = require("crypto-js");

class AdminAuthController {
  async AddUser(req, res) {
    const { username, password, name } = req.body;
    const newAdmin = await Admin.create({
      name: name,
      username: username,
      password: password,
      isAdminActive: req.body.isAdminActive ? req.body.isAdminActive : false,
    });
    if (!newAdmin) return res.status(400).send("Bad request");
    return res.status(201).json({ message: "Admin has been added..." });
  }
  async AdminLogin(req, res) {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    if (!admin) return res.status(401).send("Username is incorrect!");

    const decodedDBBytes = cryptojs.AES.decrypt(
      admin.password,
      PASSWORD_SECRET
    );
    const decDBPassword = JSON.parse(
      decodedDBBytes.toString(cryptojs.enc.Utf8)
    );

    const decodedBytes = cryptojs.AES.decrypt(password, PASSWORD_SECRET);
    const decPassword = JSON.parse(decodedBytes.toString(cryptojs.enc.Utf8));
    if (decPassword == decDBPassword) {
      const token = get_token(admin._id);
      const refresh_token = get_refresh_token(admin._id);
      return res.status(200).json({
        adminInfo: {
          username: admin.username,
          name: admin.name,
          isAdminActive: admin.isAdminActive,
          isSuperAdmin: admin.isSuperAdmin,
        },
        access_token: token,
        refresh_token: refresh_token,
      });
    }else{
        return res.status(401).send("Incorrect password!")
    }
  }
}

module.exports = AdminAuthController;
