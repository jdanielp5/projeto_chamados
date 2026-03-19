const express = require('express')
const router = express.Router()
const { readFile, writeFile } = require('../utils/fileHandler')

const path = './data/tickets.json'

router.get('/', (req, res) => {
  const tickets = readFile(path)
  res.json(tickets)
})

router.get('/:id', (req, res) => {
  const tickets = readFile(path)
  const ticket = tickets.find(t => t.id == req.params.id)
  res.json(ticket)
})

router.post('/', (req, res) => {
  const tickets = readFile(path)
  const newTicket = req.body
  const nextNum = tickets.length + 1
  newTicket.id = String(nextNum).padStart(4, '0')
  tickets.push(newTicket)
  writeFile(path, tickets)
  res.json(newTicket)
})

router.put('/:id', (req, res) => {
  const tickets = readFile(path)
  const index = tickets.findIndex(t => t.id == req.params.id)
  tickets[index] = { ...tickets[index], ...req.body }
  writeFile(path, tickets)
  res.json(tickets[index])
})

module.exports = router