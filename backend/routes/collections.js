const router = require('express').Router();
let Collection = require('../models/collection.model');

router.route('/').get((req, res) => {
    Collection.find()
        .then(collections => res.json(collections))
        .catch(() => res.status(400).json('Error!'));
})

router.route('/add').post((req, res) => {
    const {name, thumbnail} = req.body
    const collection = new Collection({
        name, 
        thumbnail
    })

    collection.save()
        .then(() => res.status(201).json("OK!"))
        .catch(() => res.status(401).json("Error!"))
});

module.exports = router