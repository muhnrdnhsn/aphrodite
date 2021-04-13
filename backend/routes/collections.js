const router = require('express').Router();
let Collection = require('../models/collection.model');
let {validateToken} = require('../utils/jwt');

router.route('/').get((req, res) => {
    Collection.find()
        .then(collections => res.json(collections))
        .catch(() => res.status(400).json('Error!'));
})

router.route('/:name').get((req, res) => {
    const {name} = req.params;

    Collection.findOne({name: name})
        .then(collection => res.json(collection))
        .catch(() => res.status(400).json('Error!'));
})

router.route('/add').post(validateToken, (req, res) => {
    const {name, thumbnail} = req.body
    const collection = new Collection({
        name, 
        thumbnail
    })

    collection.save()
        .then(() => res.json("OK!"))
        .catch(() => res.status(401).json("Error!"))
});

router.route('/edit').post(validateToken, (req, res) => {
    const { id, name, thumbnail} = req.body
    Collection.findByIdAndUpdate(id, {name: name, thumbnail: thumbnail})
        .then(() => res.json("OK!"))
        .catch(() => res.status(401).json("Error!"))
});

router.route('/').delete(validateToken, (req, res) => {
    const {name} = req.body
    
    Collection.findOneAndDelete({name: name})
        .then(() => res.json("OK!"))
        .catch(() => res.status(401).json("Error!"))
});


module.exports = router