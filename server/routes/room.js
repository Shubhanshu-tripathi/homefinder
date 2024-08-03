const express = require('express')
const roomCtrl = require('../controller/roomCtrl')
const router = express.Router()

router.post("/create", roomCtrl.createRoom)
router.put("/update/:id", roomCtrl.updateRoom)
router.delete("/delete/:id", roomCtrl.deleteRoom)
router.get("/info/:id", roomCtrl.getRoom)


module.exports = router