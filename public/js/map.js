

// Map stuff is below
let map;
let sightings

const initMap = async (lat, lon) => {
  const position = { lat: lat, lng: lon };
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.querySelector("#map"), {
    zoom: 5,
    center: position,
    mapId: "f3d47e959491cfd9",
  });
};

const getMarkerLocations = async () => {
  fetch('/api/sightings')
    .then((res)=>res.json())
    .then((data)=>{
      data.forEach(data=>{
        const formattedDate = new Date(data.createdAt).toLocaleDateString()
        setMarker(data.lat, data.lon, data.cryptid.name, formattedDate, data.spotter.username, data.image, data.content)    
      })
    
    })
};

getMarkerLocations()

const setMarker = async (lat, lon, cryptid, spottedDate = "at some point.", spotter, img, content) => {
  const position = { lat: lat, lng: lon };
  const { InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  const imgTag = document.createElement("img");
  imgTag.src = "/images/avatars/steps.png";
  const pin = new PinElement({
    background: "orange",
    borderColor: "red",
    glyphColor: "white",
    scale: 0.5,
  });

  const marker = new AdvancedMarkerElement({
    map: map, //using the globally set map var
    position: position,
    title: `${cryptid} was spotted by ${spotter} here on ${spottedDate}`,
    content: imgTag,
    gmpClickable: true,
  });

    const contentStr = `
    <div class='bg-sky-300 rounded-md	p-5'>
    <p class='text-black text-xl font-bold my-3'>${content}</p>
    <h2 style='font-size: 20px;' class='text-black my-3'>${spotter} spotted ${cryptid} here on ${spottedDate}</h2>
    <img src='${img}' class='rounded'>
    </div>
    `



  const infoWindow = new InfoWindow()
  marker.addListener("click", ({ domEvent, latLng }) => {
    const { target } = domEvent;
  
    infoWindow.close();
    

    infoWindow.setContent(contentStr)
    infoWindow.open(marker.map, marker);
  });
};

function localMap() {
  navigator.geolocation.getCurrentPosition((pos) => {
    initMap(pos.coords.latitude, pos.coords.longitude);
  });
}

localMap();
