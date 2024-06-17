const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/spotters/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.reload()
    } else {
      showModal()
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
  
function showModal() {
  document.getElementById('error-modal').checked = true;
}