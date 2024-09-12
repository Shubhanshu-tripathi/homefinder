const express = require('express')
const bookCtrl = require('../controller/bookCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/adminAuth')
// const authAdmin = require('../middleware/adminAuth')
const router = express.Router()

router.post("/bookrequest/:bookingId",auth, bookCtrl.createBookingRequest)   
// auth
router.put("/bookresponse/:bookingId",authAdmin, bookCtrl.createResponse);


router.post("/submitform", bookCtrl.submitdataform)




module.exports = router                      