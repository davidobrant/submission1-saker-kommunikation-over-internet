const nedb = require('nedb-promise')
const eventsDB = new nedb({ filename: './data/events.db', autoload: true})

/* ----- ----- ----- Events ----- ----- ----- */
const createEvent = (id, what, where, when, from, to, price) => {
    const newEvent = {
        id: id, 
        what: what, 
        where: where, 
        when: when, 
        from: from, 
        to: to,
        price: price,
        tickets: []
    }
    eventsDB.insert(newEvent)
}

const createEvents = () => {
    createEvent(1, 'Adams gura', 'Avenyn', '21 mar', '19:00', '21:30', 350)
    createEvent(2, "Benny's gäng", 'Kungsparken', '05 jun', '13:00', '15:00', 200)
    createEvent(3, "Carro's cello", 'Götaplatsen', '12 jul', '20:00', '21:30', 120)
}
// createEvents()

/* ----- ----- ----- Tickets ----- ----- ----- */
const createTickets = async (id, code, amount) => {
    for(let i = 0; i < amount; i++) {
        const ticket = {
            ticketNumber: code.toUpperCase() + (('00' + (i + 1)).slice(-3)), 
            available: true, 
            validated: false
        }
        console.log(ticket)
        await eventsDB.update({id: id}, {$push: {tickets: ticket}})
    }
}

// createTickets(1, 'abc', 20)
// createTickets(2, 'def', 80)
// createTickets(3, 'ghi', 30)

/* ----- ----- ----- Operations ----- ----- ----- */

const getAllEvents = async () => {
    const events = await eventsDB.find({})
    return events
}
// getAllEvents()

const getEvent = async (id) => {
    const event = await eventsDB.find({id: id})
    return event
}
// getEvent(2)

const getAvailableTickets = async (id) => {
    try {
        const event = await eventsDB.find({ id: id})
        const tickets = event[0].tickets
        const available = tickets.filter(ticket => ticket.available === true)
        return available.length
    } catch (err) {
        return console.log(err.message)
    }
}
// getAvailableTickets(2)

const sellTicket = async (id) => {
    const event = await eventsDB.find({ id: id })
    const tickets = event[0].tickets
    
    const availableTicket = tickets.find(ticket => ticket.available === true)
    if(!availableTicket) return false
    availableTicket.available = false

    const oldTickets = tickets.filter(ticket => ticket.ticketNumber !== availableTicket.ticketNumber)
    const newTickets = [...oldTickets, availableTicket]

    eventsDB.update({ id: id }, {$set: { tickets: newTickets }})
    return availableTicket.ticketNumber
}
// sellTicket(2)

const verifyTicket = async (number) => {
    try { 
        const data = await eventsDB.find({ "tickets.ticketNumber": number.toUpperCase()})
        const tickets = data[0].tickets;
        const newTicket = tickets.find(item => {
            return item.ticketNumber === number.toUpperCase();
        })
        if(!newTicket) return false
        if(newTicket.validated === true) {
            console.log('validated')
            return true
        }
        if(newTicket.validated === false) {
            console.log('not validated, validating...')
            newTicket.validated = true;   
            const filteredItems = tickets.filter(item => {
                return item.ticketNumber !== number.toUpperCase();
            })
            const newTickets = [...filteredItems, newTicket]
            await eventsDB.update({id: data[0].id}, {$set: {tickets: newTickets}})
            return false
        }
    } catch (err) {
        console.log(err.message)
        return 'notValid'
    }
}
// verifyTicket('abc007')

/* ----- ----- ----- RemoveAll ----- ----- ----- */
const clearEventsDB = async () => { eventsDB.remove({}, {multi: true})}
// clearEventsDB();

module.exports = { getAllEvents, getEvent, getAvailableTickets, sellTicket, verifyTicket }