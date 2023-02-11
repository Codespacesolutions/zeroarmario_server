const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ptypeSchema = Schema({
    user: {type:Schema.Types.ObjectId, required: true, ref:"Admin"},
    ptype: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, required: true, ref:'Subcategory'}
},{
    timestamps: true
})

const Ptype = mongoose.model('Ptype', ptypeSchema)
module.exports = Ptype