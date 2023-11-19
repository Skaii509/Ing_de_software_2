import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  chatId: String,
  senderId: String,
  text: String
}, {
  timestamps: true
})

export default mongoose.model('Message', MessageSchema)
