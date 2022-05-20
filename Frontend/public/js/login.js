const usernameInput = document.querySelector('.username')
const passwordInput = document.querySelector('.password')
const message = document.querySelector('[data-message]')

const loginBtn = document.querySelector('.login-btn')

loginBtn.onclick = async (e) => {
    e.preventDefault();
    logIn();
}

passwordInput.addEventListener('keyup', (e) => { 
    if(event.keyCode === 13) {
        logIn();
    }
})

const logIn = async () => {
    if (!usernameInput.value || !passwordInput.value) return ;
    const credentials = {
        username: usernameInput.value,
        password: passwordInput.value
    }
    const response = await fetch('http://localhost:4000/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
    if(response.status === 401) {
        message.innerText = `Användare: ${usernameInput.value} kunde inte hittas`;
        setTimeout(() => {
            message.innerText = ''; 
        }, 2000)
        passwordInput.value = '';
        usernameInput.value = '';
        usernameInput.focus();
        return
    }
    if(response.status === 403) {
        message.innerText = `Felaktigt lösenord`;
        setTimeout(() => {
            message.innerText = ''; 
        }, 2000)
        passwordInput.value = '';
        passwordInput.focus();
        return
    }
    const data = await response.json();
    if(data.success) {
        sessionStorage.setItem('token', data.token)
        window.location.href = 'http://localhost:4000/staff/verify'
    }
}

