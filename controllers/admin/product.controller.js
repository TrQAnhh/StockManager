const Product = require('../../models/product.model');
const systemConfig = require('../../config/system');
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
        .sort({ position: "desc"})
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
    req.flash("success","Successfully update the product's status");
    res.redirect("back");

}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    // Soft Delete (set deleted attribute of record to true)
    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: type});
            req.flash("success",`Successfully updated the status of ${ids.length} products`);
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: type});
            req.flash("success",`Successfully updated the status of ${ids.length} products`);
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}}, {deleted: true, status: "inactive", deletedAt: new Date()});
            req.flash("success",`Successfully delete ${ids.length} products`);
            break;
        case "change-position":
            for(const item of ids) {
                let [id,position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id: id}, {position: position});
            }
            req.flash("success",`Successfully change the products' positions`);
            break;
        default:
            break;
    }

    res.redirect("back");
};

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
    req.flash("success",`Successfully delete the product`);
    res.redirect("back");
}

// [PATCH] /admin/products/restore/:id
module.exports.restoreProduct = async (req,res) => {
    const id = req.params.id;

    await Product.updateOne(
        {_id: id},
        {deleted: false,
                deletedAt: null,
                status: "active",
        },
    );
    req.flash("success",`Successfully restore the product`);
    res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req,res) => {
    res.render("admin/pages/product/create", {
        pateTitle: "create"
    });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    try {
        // Convert numeric fields to integers
        req.body.price = parseInt(req.body.price) || 0;
        req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
        req.body.stock = parseInt(req.body.stock) || 0;

        // Handle position if left empty
        if (!req.body.position || req.body.position === '') {
            const countProducts = await Product.countDocuments();
            req.body.position = countProducts + 1;
        } else {
            req.body.position = parseInt(req.body.position) || 1;
        }

        // Ensure thumbnail path is not null (commented because we already have cloudinary to store static files)
        // if (req.file) {
        //     req.body.thumbnail = `/uploads/${req.file.filename}`;
        // }

        // Create a new product
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.redirect(`${systemConfig.prefixAdmin}/products`);
    } catch (error) {
        console.error("Error creating product:", error);
        res.redirect(`${systemConfig.prefixAdmin}/products/create`);
    }
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req,res) => {
    try {
        const findCondition = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(findCondition);

        res.render("admin/pages/product/edit", {
            pateTitle: "Edit products",
            product: product
        });
    } catch (error) {
        return res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req,res) => {
    try {
        // Convert numeric fields to integers
        req.body.price = parseInt(req.body.price) || 0;
        req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
        req.body.stock = parseInt(req.body.stock) || 0;
        req.body.position = parseInt(req.body.position) || 1;


        // Ensure thumbnail path is not null
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }

        // Create a new product
        await Product.updateOne({_id: req.params.id},req.body);
        req.flash("success", "Successfully editing a product!");
        res.redirect("back");
    } catch (error) {
        console.error("Error editing product:", error);
        res.redirect("back");
    }
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req,res) => {
    try {
        const findCondition = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(findCondition);

        res.render("admin/pages/product/detail", {
            pateTitle: "Product's Details",
            product: product
        });
    } catch (error) {
        return res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}