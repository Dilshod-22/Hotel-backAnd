const userModel = require("../models/UserModel");
const expressAsyncHandler = require("express-async-handler");

const register = expressAsyncHandler(async (req, res) => {
    const { fullName, email, phone, password, address } = req.body;

    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({ message: req.body });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({ fullName, email, phone, password, address });
    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address
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
        phone: user.phone,
        address: user.address
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


const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email va parol kiritilishi kerak" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "Noto‘g‘ri parol" });
    }

    if (!user.userActive) {
        return res.status(403).json({ message: "Foydalanuvchi faollashtirilmagan" });
    }

    res.status(200).json({
        message: "Muvaffaqiyatli tizimga kirildi",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone
        }
    });
});

const updateUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullName, email, phone, address, password, userActive } = req.body;

    const updatedData = {
        ...(fullName && { fullName }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(password && { password }),
        ...(userActive !== undefined && { userActive }),
    };

    const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    res.status(200).json({
        message: "Foydalanuvchi yangilandi",
        user: {
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            userActive: updatedUser.userActive
        }
    });
});


module.exports = {
    register,
    getUser,
    getAllUsers,
    deActivateUSer,
    login,
    updateUser
};
