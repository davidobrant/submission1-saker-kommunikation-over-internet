const barcode = document.querySelector('[data-barcode]')
const what = document.querySelector('[data-ticket-what]')
const where = document.querySelector('[data-ticket-where]')
const when = document.querySelector('[data-ticket-when]')
const from = document.querySelector('[data-ticket-from]')
const to = document.querySelector('[data-ticket-to]')
const number = document.querySelector('[data-ticket-number]')
const backBtn = document.querySelector('[data-back-btn]')

const ticketInfo = JSON.parse(sessionStorage.getItem('ticket'))

const fetchTicket = async () => {
    const id = ticketInfo.eventId
    const response = await fetch(`http://localhost:4000/api/event/${id}`)
    const data = await response.json()
    return data
} 

const createTicket = async () => {
    const ticket = await fetchTicket()
    if(!ticketInfo.ticketNumber === false) {
        what.innerText = ticket[0].what
        where.innerText = ticket[0].where
        when.innerText = ticket[0].when
        from.innerText = ticket[0].from
        to.innerText = ticket[0].to
        number.innerText = ticketInfo.ticketNumber
        barcode.onclick = () => {
            window.print();
        }
    } else {
        what.innerText = 'Biljetterna är slut!'
    }
    // sessionStorage.removeItem('ticket')
}

backBtn.onclick = () => {
    window.location.href = 'http://localhost:4000/events'
}

createTicket()
