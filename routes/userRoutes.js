const express = require("express");
const Joi = require("joi");
const User = require("../models/user");
const router = express.Router();

const userSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(5).max(50).email().required(),
  age: Joi.number().min(18).required(),
});

const validateUser = (data) => {
  return userSchema.validate(data);
};

router.post("/users", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }

  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/users/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }

  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
