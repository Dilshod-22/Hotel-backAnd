const userModel = require("../models/UserModel");
const expressAsyncHandler = require("express-async-handler");

const register = expressAsyncHandler(async (req, res) => {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({ message: req.body });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({ fullName, email, phone, password });
    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone
    });
});
const register1 = expressAsyncHandler(async (req, res) => {
    const { fullName, email, phone, password } = req.query;

    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({ fullName, email, phone, password });
    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone
    });
});

const getUser = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
    });
});

const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await userModel.find();
    res.status(200).json(users);
});

const deActivateUSer = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedUser = await userModel.findByIdAndUpdate(id, { userActive: false }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: "User ID not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
});


module.exports = {
    register,
    register1,
    getUser,
    getAllUsers,
    deActivateUSer,
};
