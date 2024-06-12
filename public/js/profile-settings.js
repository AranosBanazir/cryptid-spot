const emailInput = document.querySelector('#email-update')
const usernameInput = document.querySelector('#username-update')
const passwordInput = document.querySelector('#password-update')
const passwordConfirm = document.querySelector('#password-confirm')
const avatar = document.querySelector('#avatar')

const profile = {
    username: '',
    email: '',
    avatar: '',
}


const getProfileData = () =>{
    fetch('/api/spotters')
        .then(res=>res.json())
        .then((data)=>{
            profile.username = data.username,
            profile.email    = data.email,
            profile.avatar   = data.avatar

            emailInput.value = profile.email
            usernameInput.value = profile.username
            avatar.setAttribute('src', profile.avatar)

        })
}

getProfileData()