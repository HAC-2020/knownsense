const express = require('express');
const Router = express.Router();
const Req = require('../models/request');

Router.get('/api/v1/requests/:docId', async (req, res) => {
  try {
    const reqdata = await Req.find({ docId: req.params.docId });
    res.send(reqdata);
  } catch (err) {
    return res.status(422).send(err.message);
  }
})

Router.post('/api/v1/requests/:docId', async (req, res) => {
  try {
    const newreq = new Req({
      name: req.body.name,
      email2: req.body.email2,
      panic: req.body.panic,
      session: req.body.session,
      docId: req.params.docId,
    })
    console.log(newreq.email2);
    await newreq.save();
    res.send(newreq);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err.message);
  }
})

Router.delete('/api/v1/requests/:docId', async (req, res) => {
  try {
    const del = await Req.findOneAndDelete({ docId: req.params.id });
    res.send(del);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err.message);
  }
})

Router.put('/api/v1/requests/:id', async (req, res) => {
  try {
    const update = { session: req.body.session };
    const newreqdata = await Req.findByIdAndUpdate(req.params.id, update);
    res.send(newreqdata);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err.message);
  }
})

Router.get('/api/v1/request/:id', async (req, res) => {
  try {
    const data = await Req.findById(req.params.id);
    res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err.message);
  }
})

module.exports = Router;