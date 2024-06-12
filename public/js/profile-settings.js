const emailInput = document.querySelector('#email-update')
const usernameInput = document.querySelector('#username-update')
const passwordInput = document.querySelector('#password-update')
const passwordConfirm = document.querySelector('#password-confirm')
const passwordConfirmLabel = document.querySelector('#confirm-label')
const avatar = document.querySelector('#avatar')
const avatarBtn = document.querySelector('#avatar-btn')
const avatarContainer = document.querySelector('#avatar-container')
const form       = document.querySelector('#profile-settings')
const alertDiv = document.querySelector('#alert-div')
const errMsg = document.querySelector('#err-msg')

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


const errorAlert = (msg) =>{
    alertDiv.classList.remove('hidden')
    errMsg.innerHTML = msg
    setTimeout(()=>{
        alertDiv.classList.add('hidden')
        errMsg.innerHTML = ''
    },3000)
}


const avatarChange = ( e ) =>{
    e.preventDefault()
    
    profile.avatar = e.target.attributes.src.textContent
    avatar.src = e.target.attributes.src.textContent
    
    }
    
const handleUpdate = async (e) =>{
    e.preventDefault()

        //validation password
    if (passwordInput.value !== ''){
        if (passwordConfirm.value !== passwordInput.value){
            errorAlert('Password and Password Confirmation do not match')
            return 
        } else {
            profile.password = passwordInput.value
        }
    }


    if (usernameInput.value !== profile.username)
//checking the username does not already exists
    fetch(`/api/spotters/${usernameInput.value}`)
        .then(res=>{
            if (res.status === 302){
                errorAlert('Username already exists')
            }
            return
        })

    await fetch('/api/spotters/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
    })
}


const passwordMatches = (e) =>{
 if (passwordConfirm.value === ''){
    passwordConfirmLabel.classList.add('input-bordered')
    passwordConfirmLabel.setAttribute('style', '')
}else if (e.target.value !== passwordInput.value){
        passwordConfirmLabel.classList.remove('input-bordered')
        passwordConfirmLabel.setAttribute('style', 'outline-style: none; border-color: red;')
        
    }else if (e.target.value === passwordInput.value){
        passwordConfirmLabel.classList.add('input-bordered')
        passwordConfirmLabel.setAttribute('style', 'outline-style: none; border-color: green;')
    }
}


    
    
avatarBtn.addEventListener('click', avatarChange)
form.addEventListener('submit', handleUpdate)
passwordConfirm.addEventListener('input', passwordMatches)

getProfileData()
renderAvatars()