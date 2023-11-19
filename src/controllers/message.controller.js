import MessageModel from '../models/message.model.js'

export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body

  const message = new MessageModel({
    chatId,
    senderId,
    text
  })

  console.log('Existe chatId ->', message.chatId)
  try {
    const response = await message.save()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

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
