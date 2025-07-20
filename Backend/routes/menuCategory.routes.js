const express = require('express')
const { createMenuCategory, getAllMenuCategoryByRestaurantId, updateMenuCategory, deleteMenuCategory } = require('../controllers/menuCategory.controller')
const router = express.Router()

router.post('/', createMenuCategory)
router.get('/:id', getAllMenuCategoryByRestaurantId)
router.put('/:id', updateMenuCategory)
router.delete('/:id', deleteMenuCategory)

module.exports = router