const express = require('express')
const bookCtrl = require('../controller/bookCtrl')
const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/adminAuth')
const router = express.Router()

router.post("/bookrequest", auth,  bookCtrl.createBookingRequest)
router.put("/bookresponse/:bookingid", bookCtrl.createResponse)
// /authadmin|

module.exports = router                      