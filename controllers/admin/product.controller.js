const Product = require('../../models/product.model')

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let filterStatus = [
        {
            name: "All",
            status: "",
            class: "",
        },{
            name: "Active",
            status: "active",
            class: "",
        },{
            name: "Inactive",
            status: "inactive",
            class: "",
        }
    ]

    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status === req.query.status);
        filterStatus[index].class = "active"
    } else { // status is empty (for filter all)
        const index = filterStatus.findIndex(item => item.status === "");
        filterStatus[index].class = "active"
    }

    let condition = {
        deleted: false,
    };

    if(req.query.status) {
        condition.status = req.query.status;
    }

    const products = await Product.find(condition);

    res.render("admin/pages/product/index",{
        products: products,
        filterStatus: filterStatus,
    });
}