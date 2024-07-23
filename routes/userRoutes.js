const express = require("express")
const router = express.Router();
const userController  = require('../controller/userController')
const {verifyToken} = require('../utils/verifyToken')
const {verifyUser} = require('../utils/verifyToken')
const {verifyAdmin} = require('../utils/verifyToken')

//testing verifications:
//router.get('/checkAuth', verifyToken, (req, res) => {
  //  res.status(200).json({ message: 'This is a protected route', user: req.user });
//});
//router.get('/checkUser/:id', verifyUser, (req, res) => {
  //  res.status(200).json({ message: 'Working bro', user: req.user });
//});
//router.get('/checkAdmin/:id', verifyAdmin, (req, res) => {
  //  res.status(200).json({ message: 'Admin bro', user: req.user });
//});
//proper routes:
router.route('/').get(verifyAdmin,userController.getAllUser)
router.route('/:id').get(verifyUser,userController.getUser).patch(verifyUser,userController.updateUser).delete(verifyUser,userController.deleteUser)


module.exports =  router