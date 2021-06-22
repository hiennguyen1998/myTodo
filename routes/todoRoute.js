const express = require('express')
const router = express.Router()
const todoCtrl = require('./../controllers/dotoCtrl')
router.route('/')
    .get(todoCtrl.getAll)
    .post(todoCtrl.create)
    .put(todoCtrl.update)
    .delete(todoCtrl.delete)

module.exports = router