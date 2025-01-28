const Product = require('../../models/product.model')

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let condition = {
        deleted: false,
    };

    if(req.query.status) {
        condition.status = req.query.status;
    }

    const products = await Product.find(condition);

    res.render("admin/pages/product/index",{
        products: products,
    });
}