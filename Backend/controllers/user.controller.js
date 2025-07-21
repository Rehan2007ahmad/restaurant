const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

//register user
exports.createUser = async (req, res) => {
  try {
    const { restaurantId, firstName, lastName, email, password, role } =
      req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User Exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      restaurantId,
      firstName,
      lastName,
      email,
      password: hasedPassword,
      role,
    });

    const generateToken = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
        restaurantId: newUser.restaurantId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "User Created Success fully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
      token: generateToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credintials" });
    }

    const generateToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        restaurantId: user.restaurantId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "logged in succes fully",
      token: generateToken,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const getUser = await User.findById(id).select("-password");

    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(getUser);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const update = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      select: "-password",
    });

    res
      .status(200)
      .json({ message: "User Updated Successfully", user: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
