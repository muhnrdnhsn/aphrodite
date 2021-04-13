const router = require('express').Router();
let Item = require('../models/item.model');
let {validateToken} = require('../utils/jwt');

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(() => res.status(400).json('Error!'));
})

router.route('/collection/:id').get((req, res) => {
    const {id} = req.params

    Item.find({collectionID: id})
        .then(items => res.json(items))
        .catch(() => res.status(400).json('Error!'));
})

router.route('/add').post(validateToken, (req, res) => {
    let data = req.body
    const materials = data.materials.split(";")
    const sizes = data.sizes.split(";")

    data.materials = materials
    data.sizes = sizes

    const item = new Item(data)

    item.save()
        .then(() => res.json("OK!"))
        .catch((err) => res.status(401).json(err))
});

router.route('/').delete(validateToken, (req, res) => {
    const {id} = req.body
    
    Item.findByIdAndDelete(id)
        .then(() => res.json("OK!"))
        .catch(() => res.status(401).json("Error!"))
});

router.route('/edit').post(validateToken, (req, res) => {
    if(req.body.photo){
        const {photo, id} = req.body
        Item.findByIdAndUpdate(id, {
            $push: {
                photos: photo
            }
        })
            .then(() => res.json("OK!"))
            .catch(() => res.status(401).json("Error!"))

    }else{
        const {data, id} = req.body
        Item.findByIdAndUpdate(id, data)
            .then(() => res.json("OK!"))
            .catch(() => res.status(401).json("Error!"))
    }
});

module.exports = router;