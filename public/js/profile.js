const cryptidForm = document.getElementById('cryptid-create-form')


cryptidForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = document.getElementById('cryptid-name-create').value
    const description = document.getElementById('cryptid-desc-create').value
    const region = document.getElementById('cryptid-region-create').value

    try {
        const createCryptid = await fetch('/api/cryptids/', 
        {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, description, region})
        }
    )
    } catch (err) {
        console.log(err)
    }
    location.reload()
})