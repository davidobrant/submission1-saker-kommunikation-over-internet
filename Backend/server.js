const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '..', 'Frontend', 'public')))
app.use('/staff', express.static(path.join(__dirname, '..', 'Frontend', 'public')))
app.use('/ticket', express.static(path.join(__dirname, '..', 'Frontend', 'public')))

app.use('/api', require('./routes/api/api'));
app.use('/auth', require('./routes/auth'));
app.use('/staff', require('./routes/staff'));

app.get('^/$|/events(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'views', 'events.html'))
})

app.get('/ticket/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'views', 'ticket.html'))
})

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'Frontend', 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}... ;)`));