module.exports.createPost = (req,res) => {
    // Check if required fields are missing
    if (!req.body.title || !req.body.price || !req.body.stock || !req.body.filename) {
        req.flash("error", "Missing required fields.");
        res.redirect("back");
        return;
    }

    next();
}