const Product = require('../../models/product.model');
const systemConfig = require("../../config/system");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "descending"});

    // new price (after discount)
    products.forEach(item => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
    })

    res.render("client/pages/product/index",{
        products: products,
    });
}

// [GET] /products/:slug
module.exports.detail = async (req,res) => {
    try {
        const findCondition = {
            deleted: false,
            slug: req.params.slug
        };

        const product = await Product.findOne(findCondition);

        res.render("client/pages/product/detail", {
            pateTitle: "Product's Details",
            product: product
        });
    } catch (error) {
        return res.redirect(`client/products`);
    }
}