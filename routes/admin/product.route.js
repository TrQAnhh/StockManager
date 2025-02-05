const express = require('express');
const controller = require('../../controllers/admin/product.controller');
const router = express.Router();

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
module.exports = router;