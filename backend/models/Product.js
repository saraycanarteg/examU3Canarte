const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{
    productId: { type: String, required: true, unique: true },
    name: {type: String, required:true},
    brand:{type: String, required:true},
    provider: {type: String, require: true},
    price: {type: Number, required:true}
},
{
    collection: 'product',
});

module.exports = mongoose.model('Product', productSchema);