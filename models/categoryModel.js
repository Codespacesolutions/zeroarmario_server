const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = Schema({
    user: {type:Schema.Types.ObjectId, required: true, ref:"Admin"},
    category: {type: String, required: true}
},{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category