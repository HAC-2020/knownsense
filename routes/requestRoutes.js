const express = require('express');
const Router = express.Router();
const Request = require('../models/request');

Router.get('/api/v1/requests/:docId', async (req, res) => {
  try {
    const reqdata = await Request.find({ docId: req.params.docId });
    res.send(reqdata);
  } catch (err) {
    return res.status(422).send(err.message);
  }
})

Router.get('/api/v1/requests/:docId', async (req, res) => {
  try {
    const newreq = new Request({
      name: req.body.name,
      email: req.body.email,
      panic: req.body.panic,
      session: req.body.session,
      docId: req.body.docId,
    })
    await newreq.save();
    res.send(newreq);
  } catch (err) {
    return res.status(422).send(err.message);
  }
})

module.exports = Router;