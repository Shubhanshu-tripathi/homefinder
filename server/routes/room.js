const express = require('express');
const roomCtrl = require('../controller/roomCtrl');
const authAdmin = require('../middleware/adminAuth');
const router = express.Router();

router.post("/create", authAdmin, roomCtrl.createRoom)
router.put("/update/:id", authAdmin, roomCtrl.updateRoom)


module.exports = router  