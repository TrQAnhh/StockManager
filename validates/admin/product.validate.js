module.exports.createPost = (req, res, next) => {
    // Check if required fields are missing
    if (!req.body.title || !req.body.price || !req.body.stock ) {
        req.flash("error", "Missing required fields.");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.editPatch = (req, res, next) => {
    // Check if required fields are missing
    if (!req.body.title || !req.body.price || !req.body.stock) {
        req.flash("error", "Missing required fields.");
        res.redirect("back");
        return;
    }

    next();
}