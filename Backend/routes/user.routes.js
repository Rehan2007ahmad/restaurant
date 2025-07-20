const express = require('express')
const { createUser, loginUser, getUserById, updateUser } = require('../controllers/user.controller')
const router = express.Router()

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)

module.exports = router