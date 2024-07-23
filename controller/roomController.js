const Room = require('../models/room')
const Hotel = require('../models/hotel')
const { createError } = require('../utils/errhandle')


exports.createRoom = async(req,res,next)=>{
    try{
    //getting hotel id:
    const hotelId = req.params.id;
    //creating a room:
    const newRoom = await Room.create(req.body)
    //we have to save the room id in the array of rooms in hotel, basically have to updated hotel details:
    await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:newRoom._id}})
    res.status(200).json({
        status:"success",
        message:"Created room and updated hotel",
        data:{
            newRoom
        }
    })
    }catch(err){next(err)}
}
//update room:
exports.updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedRoom) {
            return next(createError(404, 'Room not found'));
        }
        res.status(200).json({
            status: 'success',
            data: { updatedRoom }
        });
    } catch (err) {
        next(err);
    }
};

// Delete a hotel
exports.deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return next(createError(404, 'Room not found'));
        }
        //updating hotel details:
        await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};

// Get a single Room:
exports.getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return next(createError(404, 'Room not found'));
        }
        res.status(200).json({
            status: 'success',
            data: { room }
        });
    } catch (err) {
        next(err);
    }
};

// Get all rooms:
exports.getAllroom = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({
            status: 'success',
            data: { rooms }
        });
    } catch (err) {
        next(err);
    }
};