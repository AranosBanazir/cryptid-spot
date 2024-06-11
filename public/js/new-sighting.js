const cryptidSelector = document.querySelector("#cryptid-selector");
const saveBtn = document.querySelector("#save-btn");
const contentInput = document.querySelector("#contentInput");

let lat;
let lon;

navigator.geolocation.getCurrentPosition((position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
});

const getCryptids = async () => {
  fetch("/api/cryptids")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      const cryptids = data.map((cryptid) => {
        const option = document.createElement("option");
        option.innerText = cryptid.name;
        option.setAttribute("value", cryptid.id);
        cryptidSelector.appendChild(option);
      });
    });
};

getCryptids();

initMap = async () => {
  let position;
  navigator.geolocation.getCurrentPosition((pos) => {
    position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  });
  console.log(position);
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  map = new Map(document.querySelector("#map"), {
    zoom: 10,
    center: position,
    mapId: "f3d47e959491cfd9",
    disableDefaultUI: true,
  });

  const imgTag = document.createElement("img");
  imgTag.src = "/images/avatars/ufoGlyph.png";

  const sightingMarker = new AdvancedMarkerElement({
    map,
    position: position,
    gmpDraggable: true,
    content: imgTag,
    title: "This marker is draggable.",
  });

  sightingMarker.addListener("dragend", (e) => {
    const position = sightingMarker.position;
    lat = position.lat;
    lon = position.lng;
  });
};

function handleSaveCryptid(e) {
  e.preventDefault();
  console.log(lat, lon);
  const newSighting = {
    cryptid_id: cryptidSelector.value,
    content: contentInput.value,
    lat,
    lon,
  };

  fetch("/api/sightings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSighting),
  }).then((res) => {
    if (res.status === 201) {
      location.href = "/";
    }
  });
}

saveBtn.addEventListener("click", handleSaveCryptid);

initMap();
