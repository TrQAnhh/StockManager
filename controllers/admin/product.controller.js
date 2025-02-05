const Product = require('../../models/product.model');

const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search');
const paginationHelpers = require('../../helpers/pagination');

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // Initialize the filter condition
    let condition = {};

    // Filter by deletion status
    if (req.query.deleted === 'true') {
        condition.deleted = true;
    } else {
        condition.deleted = false;
    }

    // Filter by product status if provided
    if (req.query.status && req.query.deleted !== 'true') {
        condition.status = req.query.status;
    }

    // Implement search functionality
    const objectSearch = searchHelpers(req.query);
    if (objectSearch.regex) {
        condition.title = objectSearch.regex;
    }

    // Pagination setup
    const countProducts = await Product.countDocuments(condition);
    let objectPagination = paginationHelpers(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countProducts
    );

    // Fetch products based on the condition and pagination
    const products = await Product.find(condition)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    // Render the appropriate view
    res.render("admin/pages/product/index", {
        products: products,
        filterStatus: filterStatusHelpers(req.query),
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
};


// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id},{status: status});

    res.redirect("back");

}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    await Product.updateMany({_id: { $in: ids }}, {status: type} );
    res.redirect("back");
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteProduct = async (req,res) => {
    const id = req.params.id;

    // Hard delete
    // await Product.deleteOne({_id: id});

    // Soft Delete (set deleted attribute of record to true)
    await Product.updateOne(
        {_id: id},
        {deleted: true,
            deletedAt: new Date(),
            status: "inactive",
        },
    );

    res.redirect("back");
}

// [PATCH] /admin/products/restore/:id
module.exports.restoreProduct = async (req,res) => {
    const id = req.params.id;

    await Product.updateOne(
        {_id: id},
        {deleted: false,
                deletedAt: null,
        },
    );

    res.redirect("back");
}