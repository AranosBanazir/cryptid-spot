const emailInput = document.querySelector('#email-update')
const usernameInput = document.querySelector('#username-update')
const passwordInput = document.querySelector('#password-update')
const passwordConfirm = document.querySelector('#password-confirm')
const avatar = document.querySelector('#avatar')
const avatarBtn = document.querySelector('#avatar-btn')
const avatarContainer = document.querySelector('#avatar-container')
const form       = document.querySelector('#profile-settings')

const avatars = [
    'alien',
    'bigfoot',
    'biggerfoot',
    'default',
    'frankenstein',
    'ghost',
    'ufo',
    'veysel'
]



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


const renderAvatars = () =>{
    avatars.forEach(avatar=>{
        const avatarBox = document.createElement('div')
        const avatarImg = document.createElement('img')

        avatarBox.classList.add('w-[50px]')
        avatarBox.classList.add('h-[50px]')
        avatarBox.classList.add('m-3')
        avatarImg.setAttribute('src', `/images/avatars/${avatar}.png`)
        avatarImg.setAttribute('alt', `an avatar of a ${avatar}`)


        avatarContainer.appendChild(avatarBox)
        avatarBox.appendChild(avatarImg)

    })
}



const avatarChange = ( e ) =>{
    e.preventDefault()
    
    profile.avatar = e.target.attributes.src.textContent
    avatar.src = e.target.attributes.src.textContent
    
    }
    
const handleUpdate = async (e) =>{
    e.preventDefault()

    await fetch('/api/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
    })
}

    
    
avatarBtn.addEventListener('click', avatarChange)
form.addEventListener('submit', handleUpdate)

getProfileData()
renderAvatars()