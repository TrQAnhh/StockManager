const Product = require('../../models/product.model');

const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search');
const paginationHelpers = require('../../helpers/pagination');

// [GET] /admin/products
module.exports.index = async (req, res) => {

    // All / Active / Inactive filters
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
    // Submission search
        let condition = {
            deleted: false,
        };

        if(req.query.status) {
            condition.status = req.query.status;
        }

        const objectSearch = searchHelpers(req.query);

        // let keyword = "";
        //
        // if(req.query.keyword) {
        //     keyword = req.query.keyword;
        //
        //     // const regex = /keyword/i;
        //
        //     const regex= new RegExp(keyword, "i");
        //
        //     condition.title = regex;
        // }


        if(objectSearch.regex) {
           condition.title = objectSearch.regex;
        }

    // End submission search

    // Pagination (phân trang)

        // Before being optimized

            //     let objectPagination = {
            //         currentPage: 1,
            //         limitItems: 4
            //     }

            // Get the current page from query (cần convert từ string -> number (màu vàng))
            // if(req.query.page) {
            //     objectPagination.currentPage = parseInt(req.query.page);
            // }

            // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

            // Count the number of documents we have in product model
            // const countProducts = await Product.countDocuments(condition);

            // The number of pages = total documents / the number of documents in each page
            // const totalPage = Math.ceil(countProducts / objectPagination.limitItems);

            //objectPagination.totalPages = totalPage;

        // After optimized

            // Count the number of documents we have in product model
            const countProducts = await Product.countDocuments(condition);

            let objectPagination = paginationHelpers(
                {
                    currentPage: 1,
                    limitItems: 4
                },
                req.query,
                countProducts
            );


    // End pagination

    const products = await Product.find(condition).limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render("admin/pages/product/index",{
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({
        _id: id
    },{
        status: status
    });

    res.redirect("back");
}