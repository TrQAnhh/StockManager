const Product = require('../../models/product.model');

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    // new price (after discount)
    products.forEach(item => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
    })

    res.render("client/pages/product/index",{
        products: products,
    });
}

