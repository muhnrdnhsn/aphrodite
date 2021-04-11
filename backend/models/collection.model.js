const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;