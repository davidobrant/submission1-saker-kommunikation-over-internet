const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/verifyJWT')
const { getAllEvents, getAvailableTickets, getEvent, verifyTicket, sellTicket } = require('../../Model/eventsDB')

router.get('/events', async (req, res) => {
    const events = await getAllEvents();
    res.json(events)
})

router.get('/event/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const event = await getEvent(id)
    res.json(event)
})

router.get('/buyticket/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const ticketNumber = await sellTicket(id)
    res.json(ticketNumber)
})

router.get('/availabletickets/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const data = await getAvailableTickets(id)
    res.json(data)
})

router.post('/verify', verifyToken, async (req, res) => {
    const number = req.body.number
    const ticketNumber = await verifyTicket(number)
    res.json(ticketNumber)
})

// router.get('/login', (req, res) => {
//     console.log('Här kan man va')
//     res.header('Authorization', req.token)
//     console.log(req.token)

//     res.redirect('../staff/verify')
//     // res.send(req.token)
// })

module.exports = router;