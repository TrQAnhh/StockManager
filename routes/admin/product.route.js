const express = require('express');
const multer  = require('multer');
const storageMulter =  require('../../helpers/storageMulter');
// const upload = multer({ dest: './public/uploads' });
const upload = multer({ storage: storageMulter() });

const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validates/admin/product.validate');
const router = express.Router();


router.get("/", controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteProduct);
router.patch("/restore/:id", controller.restoreProduct);
router.get("/create", controller.create);

router.post(
    "/create",
    upload.single("thumbnail"),
    validate.createPost, // acts as a middleware
    controller.createPost);

module.exports = router;