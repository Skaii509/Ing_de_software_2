import { Router } from 'express'
import {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  removeUsers,
  removeUser,
  logout
} from '../controllers/user.controller.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getUsers)
router.delete('/', removeUsers)
router.delete('/:id', removeUser)
router.post('/logout', logout)

export default router
