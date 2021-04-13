const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    dimension: {
        type: String,
        required: true
    },
    collectionID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Collection'
    },
    photos: [String],
    materials: [String],
    sizes: [String]
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;