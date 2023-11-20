import MessageModel from '../models/message.model.js'

// CREATE MESSAGE
export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body

  const message = new MessageModel({
    chatId,
    senderId,
    text
  })

  try {
    const response = await message.save()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// GET A MESSAGE
export const getMessages = async (req, res) => {
  const { chatId } = req.params

  try {
    const messages = await MessageModel.find({ chatId })
    res.status(200).json(messages)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const deleteMessages = async (req, res) => {
  const { chatId } = req.params

  try {
    const response = await MessageModel.deleteMany({ chatId })
    res.status(200).send(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
