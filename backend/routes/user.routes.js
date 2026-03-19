const express = require('express')
const router = express.Router()
const { readFile, writeFile } = require('../utils/fileHandler')

const path = './data/users.json'

router.get('/', (req, res) => {
  const users = readFile(path)
  res.json(users)
})

router.get('/:id', (req, res) => {
  const users = readFile(path)
  const user = users.find(u => u.id == req.params.id)
  res.json(user)
})

router.post('/', (req, res) => {
  const users = readFile(path)
  const newUser = req.body
  const nextNum = users.length + 1
  newUser.id = String(nextNum).padStart(4, '0')
  users.push(newUser)
  writeFile(path, users)
  res.json(newUser)
})

router.put('/:id', (req, res) => {
  const users = readFile(path)
  const index = users.findIndex(u => u.id == req.params.id)
  users[index] = { ...users[index], ...req.body }
  writeFile(path, users)
  res.json(users[index])
})

router.delete('/:id', (req, res) => {
  let users = readFile(path)
  users = users.filter(u => u.id != req.params.id)
  writeFile(path, users)
  res.json({ message: 'Usuario removido' })
})

module.exports = router