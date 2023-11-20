import express from 'express'
import { createMessage, getMessages, deleteMessages } from '../controllers/message.controller.js'

const router = express.Router()

router.post('/', createMessage)
router.get('/:chatId', getMessages)
router.delete('/:chatId', deleteMessages)

export default router
