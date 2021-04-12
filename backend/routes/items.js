const multer = require('multer');
const upload = multer();

const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(() => res.status(400).json('Error!'));
});

router.route('/collection/:id').get((req, res) => {
    const {id} = req.params;
    Item.find({collectionID: id})
        .then(items => res.json(items))
        .catch(() => res.status(400).json('Error!'));
});

router.route('/:id').get((req, res) => {
    const {id} = req.params;
    Item.findById(id)
        .then(item => res.json(item))
        .catch(() => res.status(400).json('Error!'));
});

router.route('/add').post(upload.none(), (req, res) => {
    res.json(req.body);
});

module.exports = router