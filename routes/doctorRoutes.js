const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Doctor = require("../models/Doctor");

const router = express.Router();

router.post("/api/v1/doctor/signup", async (req, res) => {
  const { email, password, name, licenceId, publicAccount, type } = req.body;
  try {
    const user = new Doctor({
      email,
      password,
      name,
      licenceId,
      publicAccount,
      type,
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

router.put(
  "/api/v1/doctor/status/online/:id",
  requireDoctor,
  async (req, res) => {
    const { docId } = req.params;
    try {
      const update = { status: true };
      const status = await Patient.findByIdAndUpdate(docId, update, {
        new: true,
      });
      res.send(status);
    } catch (err) {
      return res.status(404).send({ error: err.message });
    }
  }
);

router.put(
  "/api/v1/doctor/status/ofline/:id",
  requireDoctor,
  async (req, res) => {
    const { docId } = req.params;
    try {
      const update = { status: false };
      const status = await Patient.findByIdAndUpdate(docId, update, {
        new: true,
      });
      res.send(status);
    } catch (err) {
      return res.status(404).send({ error: err.message });
    }
  }
);

module.exports = router;
