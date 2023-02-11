const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isSuperAdmin: {type: Boolean, required: true, default: false},
    isAdminActive: {type:Boolean, required: true, default:false}
},{
    timestamps: true
})

const Admin = mongoose.model('admin', adminSchema)
module.exports = Admin