let map;
initMap = async (lat, lon) => {
  const position = { lat: lat, lng: lon };
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.querySelector("#map"), {
    zoom: 10,
    center: position,
    mapId: 'f3d47e959491cfd9',
    
  });
};

getMarkerLocations = () => {
  //TODO fetch sighting info
};

setMarker = async (lat, lon, cryptid, spottedDate = "at some point.") => {
  const position = { lat: lat, lng: lon };
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  const pin = new PinElement({
    background: "orange",
    borderColor: "red",
    glyphColor: "white",
    scale: 2,
  });

  const marker = new AdvancedMarkerElement({
    map: map, //using the globally set map var
    position: position,
    title: `${cryptid} was spotted here on ${spottedDate}`,
    content: pin.element,
  });
};

function localMap() {
  navigator.geolocation.getCurrentPosition((pos) => {
    initMap(pos.coords.latitude, pos.coords.longitude);
    setMarker(pos.coords.latitude, pos.coords.longitude);
    console.log(pos.coords);
  });
}

localMap();
