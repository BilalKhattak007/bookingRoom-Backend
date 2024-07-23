const Hotel = require('../models/hotel');
const { createError } = require('../utils/errhandle')

// Get all hotels
exports.getAllHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json({
            status: 'success',
            data: { hotels }
        });
    } catch (err) {
        next(err);
    }
};

// Create a hotel
exports.createHotel = async (req, res, next) => {
    try {
        const newHotel = await Hotel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { newHotel }
        });
    } catch (err) {
        next(err);
    }
};

// Get a single hotel
exports.getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return next(createError(404, 'Hotel not found'));
        }
        res.status(200).json({
            status: 'success',
            data: { hotel }
        });
    } catch (err) {
        next(err);
    }
};

// Update a hotel
exports.updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedHotel) {
            return next(createError(404, 'Hotel not found'));
        }
        res.status(200).json({
            status: 'success',
            data: { updatedHotel }
        });
    } catch (err) {
        next(err);
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return next(createError(404, 'Hotel not found'));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};
