const cryptidForm = document.getElementById('cryptid-create-form')
const imgPreview  = document.querySelector('#img-preview')

let cryptidImage;

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


const cloudName = "cryptid"; 
const uploadPreset = "cryptid";

console.log(cloudinary, cloudinary.createUploadWidget())

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    showAdvancedOptions: true, 
    sources: ["local", "url", "camera"],
    multiple: false,
    theme: "purple",
    inlineContainer: document.querySelector('#upload-div')
     
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      cryptidImage = result.info.secure_url
      imgPreview.innerHTML = `
      <h2 class='font-bold text-xl'>Cryptid Preview:</h2>
      <img src="${cryptidImage}">`
      console.log(result.info)
    }
  }
);

document.getElementById("upload-btn").addEventListener(
  "click",
  function (e) {
    e.preventDefault()
    myWidget.open();
  },
  false
);