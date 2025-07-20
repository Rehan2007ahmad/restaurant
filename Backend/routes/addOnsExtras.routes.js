const express = require('express')
const { createAddOns, getAllAddOnsByRestaurantId } = require('../controllers/addOnsExtras.controller')
const router = express.Router()

router.post('/', createAddOns)
router.get('/:id', getAllAddOnsByRestaurantId)


module.exports = router