initMap = async () => {
  let position;
  navigator.geolocation.getCurrentPosition((pos) => {
    position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  });
  console.log(position);
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  map = new Map(document.querySelector("#map"), {
    zoom: 10,
    center: position,
    mapId: "f3d47e959491cfd9",
    disableDefaultUI: true,
  });

  const infoWindow = new InfoWindow();
  const sightingMarker = new AdvancedMarkerElement({
    map,
    position: position,
    gmpDraggable: true,
    title: "This marker is draggable.",
  });

  sightingMarker.addListener("dragend", (e) => {
    const position = sightingMarker.position;

    infoWindow.close();
    infoWindow.setContent(`Pin dropped at: ${position.lat}, ${position.lng}`);
    console.log(position.lat, position.lng);
    infoWindow.open(sightingMarker.map, sightingMarker);
  });
};

initMap();
