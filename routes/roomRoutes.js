const express = require("express")
const router = express.Router();
const roomController  = require('../controller/roomController')
const {verifyAdmin} = require('../utils/verifyToken')

//routes:
router.route('/').get(roomController.getAllroom)
router.route('/:id').get(roomController.getRoom).post(verifyAdmin,roomController.createRoom).patch(verifyAdmin,roomController.updateRoom)
router.route('/:id/:hotelid').delete(verifyAdmin,roomController.deleteRoom)

module.exports =  router