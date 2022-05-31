

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const SchemaProduct = mongoose.model('product', ProductSchema);
module.exports = SchemaProduct;