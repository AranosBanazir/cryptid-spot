const cryptidForm = document.getElementById('cryptid-create-form')

let cryptidImage = '';

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
            body: JSON.stringify({name, description, region, image: cryptidImage})
        }
    )
    } catch (err) {
        console.log(err)
    }
    location.reload()
})


const cloudName = "cryptid"; 
const uploadPreset = "cryptid";


const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    showAdvancedOptions: true, 
    sources: ["local", "url", "camera"],
    multiple: false,
    inlineContainer: document.querySelector('#upload-div'),
    styles:{
        palette: {
          window: "dimgrey",
          windowBorder: "black",
          tabIcon: "black",
          menuIcons: "black",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link:  "cyan",
          action:  "#FF620C",
          inactiveTabIcon: "#0E2F5A",
          error: "#F44235",
          inProgress: "#0078FF",
          complete: "#20B832",
          sourceBg: "black"
        },
        frame: {
          background: "#FF0000"
        },
     
    }
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      cryptidImage = result.info.secure_url
      console.log(result.info)
  }
});

document.getElementById("upload-btn").addEventListener(
  "click",
  function (e) {
    e.preventDefault()
    myWidget.open();
  },
  false
);