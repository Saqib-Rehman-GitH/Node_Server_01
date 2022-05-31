const SchemaProduct = require('../Model/ModelProduct');
const ProductRoutes = require('express').Router();

const str = text => JSON.stringify(text, null, 2)
const log = text => console.log(text);

ProductRoutes.get('/', async (req, res, next) => {
    // res.send(`GET Request of Products`);

    try {
        const allProducts = await SchemaProduct.find({}, { "__v": 0, "_id": 0 });
        res.send(allProducts);
    } catch (e) {
        console.log(`Error => ${e.message}`)
    }
})

ProductRoutes.post('/', function (req, res, next) {
    res.send(`POST Request of Products`);

})

ProductRoutes.post('/add', async (req, res, next) => {
    try {
        const allProducts = await SchemaProduct.findOne({ name: req?.body?.name || "" })
        log(`finOne = ${str(allProducts)}`);
        if (allProducts?.name == undefined) {
            const newProduct = new SchemaProduct({
                "name": req?.body?.name || "No Name",
                "price": req?.body?.price || 0
            })
            newProduct.save()
                .then(result => {
                    console.log(`New Product Saved with result ${JSON.stringify(result, null, 2)}`)
                    res.send({
                        saved: true,
                        "message": `Product Saved Successfully.`,
                        product: result
                    });
                })
        } else {
            res.send({
                saved: false,
                product: {},
                message: "Product already present with given name"
            })
        }
    } catch (e) {
        console.log(`Error => ${e}`)
    }
})

ProductRoutes.post('/update/:id', function (req, res, next) {
    next(new Error("Work in Progress"));
})

module.exports = ProductRoutes;