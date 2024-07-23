const express = require("express")
const router = express.Router();
const hotelController  = require('../controller/hotelController')
const {verifyAdmin} = require('../utils/verifyToken')

//routes:
router.route('/').get(hotelController.getAllHotel).post(verifyAdmin,hotelController.createHotel)
router.route('/:id').get(hotelController.getHotel).patch(verifyAdmin,hotelController.updateHotel).delete(verifyAdmin,hotelController.deleteHotel)


module.exports =  router