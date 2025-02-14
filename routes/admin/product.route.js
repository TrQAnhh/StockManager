const express = require('express');
const multer  = require('multer');
// const storageMulter =  require('../../helpers/storageMulter');
// const upload = multer({ dest: './public/uploads' });
// const upload = multer({ storage: storageMulter() });
const upload = multer();
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');
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
    uploadCloud.upload,
    validate.createPost, // acts as a middleware
    controller.createPost);

router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.editPatch, // acts as a middleware
    controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;