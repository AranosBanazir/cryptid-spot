// const picUploadBtn = document.querySelector('#uploadBtn')

// handleUpload = () =>{

// }

// picUploadBtn.addEventListener('click', )

const cloudName = "cryptid"; // replace with your own cloud name
const uploadPreset = "cryptid"; // replace with your own upload preset

// Remove the comments from the code below to add
// additional functionality.
// Note that these are only a few examples, to see
// the full list of possible parameters that you
// can add see:
//   https://cloudinary.com/documentation/upload_widget_reference

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    // cropping: true, //add a cropping step
    showAdvancedOptions: true,  //add advanced options (public_id and tag)
    sources: ["local", "url", "camera"],
    multiple: false,
    publicId: 'Caleb-DATE', //TODO Make this dynamic with info stored on the page
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    theme: "purple", //change to a purple theme
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      
    }
  }
);

document.getElementById("uploadBtn").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
