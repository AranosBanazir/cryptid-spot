

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
    <div class='container bg-slate-600 min-h-[500px]'>
    <p class='text-black text-xl'>${content}</p>
    <h2 style='font-size: 12px;' class='text-black'>${spotter} spotted ${cryptid} here on ${spottedDate}</h2>
    <img src='${img}' class='rounded h-[200px] w-[200px] alt='image of ${cryptid}''>
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
