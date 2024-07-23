const User = require('../models/user');
const { createError } = require('../utils/errhandle')

// Get all users
exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: { users }
        });
    } catch (err) {
        next(err);
    }
};

// Get a single User:
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (err) {
        next(err);
    }
};

// Update a User
exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            return next(createError(404, 'User not found'));
        }
        res.status(200).json({
            status: 'success',
            data: { updatedUser }
        });
    } catch (err) {
        next(err);
    }
};

// Delete a hotel
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};
