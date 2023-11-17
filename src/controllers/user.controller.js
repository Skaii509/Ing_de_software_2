import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
import { createAccessToken } from '../libs/jwt.js'
import validator from 'validator'

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) return res.status(400).json('User with then given email already exist')
    if (!username || !email || !password) return res.status(400).json('All fields are required')
    if (!validator.isEmail(email)) return res.status(400).json('Email must be a valid email')
    if (!validator.isStrongPassword(password)) return res.status(400).json('Password must be a strong password')

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      username,
      password: passwordHash
    })

    const savedUser = await newUser.save()

    // Visualizar datos del usuario
    const token = await createAccessToken({ id: savedUser._id })

    res.json({
      id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' })

    const token = await createAccessToken({ id: user._id })

    res.cookie('token', token)
    res.json({
      id: user._id,
      email: user.email,
      username: user.username,
      token,
      message: 'Successfully login'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// GET ONE USER.
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) return res.status(400).json({ message: 'User not found' })

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  } catch (error) {
    console.log('Paso por catch <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    console.log(error)
    res.status(500).json(error)
  }
}

// GET ALL USERS.
export const getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

// REMOVE ALL USERS.
export const removeUsers = async (req, res) => {
  await User.deleteMany({})
  res.send('Se eliminaron a todos los usuarios.')
}

// REMOVE ONE USER.
export const removeUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    return res.sendStatus(204)

    // if (!foundUser) return res.status(400).json({ message: 'User not found' })
    // await User.deleteOne(foundUser)
    // res.send(`Se elimino el usuario ${userId} correctamente.`)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// LOGOUT THE USER.
export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}
