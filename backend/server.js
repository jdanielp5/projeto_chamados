const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/user.routes')
const ticketRoutes = require('./routes/ticket.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/tickets', ticketRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT)
})
