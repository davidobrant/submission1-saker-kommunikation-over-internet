const verifyInput = document.querySelector('.verify-input')
const verifyBtn = document.querySelector('.verify-btn')
const verifiedHeader = document.querySelector('.verified-header')

const url = 'http://localhost:4000/api/verify'

verifyInput.addEventListener('keyup', (e) => { 
    if(e.keyCode === 13) {
        verifyTicket();
    }
})

const fetchTicket = async (number) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: number })
    })
    const ticketNumber = await response.json();
    return ticketNumber
}

const verifyTicket = async () => {
    const verified = await fetchTicket(verifyInput.value)
    if (verified === 'notValid') {
        verifiedHeader.innerText = `${verifyInput.value.toUpperCase()} is not a valid ticketnumber...`;
        verifiedHeader.style.color = 'black';
    } else if(verified) {
        verifiedHeader.innerText = `Ticket: ${verifyInput.value.toUpperCase()} is already verified`;
        verifiedHeader.style.color = 'red';
    } else if (!verified) {
        verifiedHeader.innerText = `Ticket: ${verifyInput.value.toUpperCase()} is Valid!`;
        verifiedHeader.style.color = 'green';
    }
    setTimeout(() => {
        verifiedHeader.innerText = ''
    }, 3000)
    verifyInput.value = '';
}

verifyBtn.onclick = async (e) => {
    e.preventDefault()
    if(verifyInput.value == '') {
        verifiedHeader.style.color = 'black';
        verifiedHeader.innerText = 'Enter ticketnumber';
        setTimeout(() => {
            verifiedHeader.innerText = '';
        }, 1000)
        return
    }
    verifyTicket();
}


