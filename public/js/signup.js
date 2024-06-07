const signupFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(email, username, password)
    if (email && password && username) {
        const response = await fetch('/api/spotters/', {
            method: 'POST',
            body: JSON.stringify({ email, password, username}),
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to sign up')
        }
    }
}

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);