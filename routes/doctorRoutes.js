const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Doctor = require("../models/Doctor");

const router = express.Router();

router.post("/api/v1/doctor/signup", async (req, res) => {
  const { email, password, name, licenceId, publicAccount } = req.body;
  try {
    const user = new Doctor({
      email,
      password,
      name,
      licenceId,
      publicAccount,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "DOCTOR SECRETE KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/api/v1/doctor/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const user = await Doctor.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "DOCTOR SECRETE KEY");
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

module.exports = router;
