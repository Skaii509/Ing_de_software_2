import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true, // ELIMINA LOS ESPACIOS INNECESARIOS; '  hola  ' -> 'hola'
    minLength: 3,
    maxLength: 30
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 5,
    maxLength: 50
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('User', userSchema)
