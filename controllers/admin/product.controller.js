const Product = require('../../models/product.model')
const filterStatusHelpers = require('../../helpers/filterStatus');

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // let filterStatus = [
    //     {
    //         name: "All",
    //         status: "",
    //         class: "",
    //     },{
    //         name: "Active",
    //         status: "active",
    //         class: "",
    //     },{
    //         name: "Inactive",
    //         status: "inactive",
    //         class: "",
    //     }
    // ]
    //
    // if(req.query.status) {
    //     const index = filterStatus.findIndex(item => item.status === req.query.status);
    //     filterStatus[index].class = "active"
    // } else { // status is empty (for filter all)
    //     const index = filterStatus.findIndex(item => item.status === "");
    //     filterStatus[index].class = "active"
    // }

    const filterStatus = filterStatusHelpers(req.query);

    let condition = {
        deleted: false,
    };

    if(req.query.status) {
        condition.status = req.query.status;
    }

    let keyword = "";

    if(req.query.keyword) {
        keyword = req.query.keyword;

        // const regex = /keyword/i;

        const regex= new RegExp(keyword, "i");

        condition.title = regex;
    }

    const products = await Product.find(condition);

    res.render("admin/pages/product/index",{
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}