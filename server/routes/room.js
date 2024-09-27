const express = require('express')
const roomCtrl = require('../controller/roomCtrl')
const authAdmin = require('../middleware/adminAuth')
const upload = require('../utils/Multer')
const router = express.Router()

router.post("/create", authAdmin, upload.fields([{ name: 'frontimg', maxCount: 1 }, { name: 'video', maxCount: 1 }]), roomCtrl.createRoom)
router.put("/update/:id", authAdmin,upload.fields([{ name: 'frontimg', maxCount: 1 }, { name: 'video', maxCount: 1 }]), roomCtrl.updateRoom)
router.delete("/delete/:id",authAdmin, roomCtrl.deleteRoom)
router.get("/infoRoom/:id", authAdmin, roomCtrl.getRoom)
router.get('/owner/:ownerId', roomCtrl.getRoomsByOwner);

module.exports = router     

