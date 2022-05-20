const eventList = document.getElementById('event-list')
const eventItemTemplate = document.querySelector('[data-event-template]')

const URL = 'http://localhost:4000/api/events'

const fetchEvents = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data
}    

const createEvents = async () => {
    const events = await fetchEvents();

    events.forEach(event => {
        
        const itemsAvailable = event.tickets.filter(item => { return item.available === true })
        
        const eventItem = eventItemTemplate.content.cloneNode(true)
        eventItem.querySelector('[data-event-what]').innerText = event.what
        eventItem.querySelector('[data-event-where]').innerText = event.where
        eventItem.querySelector('[data-event-day]').innerText = event.when.substring(0,2)
        eventItem.querySelector('[data-event-month]').innerText = event.when.substring(3,6)
        eventItem.querySelector('[data-event-time]').innerText = `${event.from}-${event.to}`
        eventItem.querySelector('[data-event-price]').innerText = event.price + ` sek`
        eventItem.querySelector('[data-event-tickets]').innerText = itemsAvailable.length + ' kvar';
        if (itemsAvailable.length < 10) { 
            eventItem.querySelector('[data-event-tickets]').style.color = 'red';
        } else {
            eventItem.querySelector('[data-event-tickets]').style.color = 'green';
        } 
        if (itemsAvailable == 0) {
            eventItem.querySelector('[data-event-tickets]').innerText = 'SLUT';
            eventItem.querySelector('[data-event-item]').classList.add('slut')
        }
        eventItem.querySelector('[data-event-item]').onclick = () => { 
            writeTicket(event.id) 
        } 
        eventList.appendChild(eventItem)
    })    
}    

createEvents()

const writeTicket = async (id) => {
    const data = await fetch(`http://localhost:4000/api/buyticket/${id}`)
    const ticketNumber = await data.json();
    const ticketInfo = {
        eventId: id,
        ticketNumber: ticketNumber
    }
    sessionStorage.setItem('ticket', JSON.stringify(ticketInfo))
    window.location.href = await `http://localhost:4000/ticket/${id}`
}





// const createEvents = async () => {
//     const events = await fetchEvents();
//     events.forEach(event => {
//         const eventItem = document.createElement('li')
//         eventItem.innerHTML = `
//                 <div class="event">
//                     <div class="event-date">
//                         <div class="event-day">${event.when.substring(0,2)}</div>
//                         <div class="event-month">${event.when.substring(3,6)}</div>
//                     </div>    
//                     <div class="event-details">
//                         <h3 class="event-title">${event.what}</h3>
//                         <p class="event-location">${event.where}</p>
//                         <h4 class="event-time">${event.from}-${event.to}</h5>
//                         <div class="price">${event.price} sek</div>
//                         <div class="tickets-left">${event.left} <span>kvar</span></div>
//                     </div>    
//                 </div>    
//             `;    
//         eventItem.onclick = () => {
//             console.log(event)
//         }    
//         eventList.appendChild(eventItem)
//     })    
// }    




