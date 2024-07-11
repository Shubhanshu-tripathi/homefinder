const express = require('express')
const userCtrl = require('../controller/userCtrl')
const router = express.Router()   


router.post("/register",userCtrl.register)   
router.post("/login", userCtrl.login)
router.get('/logout',userCtrl.logout)
router.get('/refresh_token', userCtrl.refreshtoken) 
router.get('/infor',userCtrl.getUser) 

module.exports = router     