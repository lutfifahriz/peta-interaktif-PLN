// === Daftar Lokasi ===
const locations = [
  {
    name: "PLN UP3 Pekalongan",
    address: "Jl. Majapahit No. 1, Pekalongan",
    coords: [-6.884423, 109.671590],
    type: "Electric utility company",
    hours: "Senin–Jumat: 08.00–16.00",
    images: ["image/gambar.jpg", "image/gambar.jpg"]
  },
  {
    name: "ULP Pekalongan Kota",
    address: "Jl. Dr. Cipto No. 45, Pekalongan",
    coords: [-6.891378, 109.675415],
    type: "Electric utility company",
    hours: "Senin–Jumat: 08.00–16.00",
    images: ["image/gambar.jpg", "image/gambar.jpg"]
  },
  {
    name: "ULP Wiradesa",
    address: "Wiradesa, Pekalongan",
    coords: [-6.943888, 109.584138],
    type: "Electric utility company",
    hours: "Senin–Jumat: 08.00–16.00",
    images: ["image/gambar.jpg", "image/gambar.jpg"]
  },
  {
    name: "ULP Kajen",
    address: "Kajen, Kab. Pekalongan",
    coords: [-7.031043, 109.611188],
    type: "Electric utility company",
    hours: "Senin–Jumat: 08.00–16.00",
    images: ["image/gambar.jpg", "image/gambar.jpg"]
  },
  {
    name: "ULP Pemalang",
    address: "Pemalang, Jawa Tengah",
    coords: [-6.889738, 109.379155],
    type: "Electric utility company",
    hours: "Senin–Jumat: 08.00–16.00",
    images: ["image/gambar.jpg", "image/gambar.jpg"]
  },
  {
    name: "ULP Randudongkal",
    address: "Randudongkal, Pemalang",
    coords: [-7.099443, 109.380652],
    type: "Electric utility company",
    hours: "Senin–Jumat: 08.00–16.00",
    images: ["image/gambar.jpg", "image/gambar.jpg"]
  },
  {
    name: "ULP Bantarbolang",
    address: "Bantarbolang, Pemalang",
    coords: [-7.054902, 109.273879],
    type: "Electric utility company",
    hours: "Senin–Jumat: 08.00–16.00",
    images: ["image/gambar.jpg", "image/gambar.jpg"]
  }
];

// === Inisialisasi Peta ===
const map = L.map("map", {
  center: [-6.95, 109.5],
  zoom: 10,
  zoomAnimation: true,
  zoomAnimationThreshold: 4,
  fadeAnimation: true,
});


// Tile Layer (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

map.scrollWheelZoom.enable();
map.options.scrollWheelZoom = "center";


// Zoom control
L.control.zoom({ position: "bottomright" }).addTo(map);

// Your Location
L.control.locate({
  position: "bottomright",
  strings: { title: "Lokasi Anda Sekarang" },
}).addTo(map);

// Geocoder (tambahan pencarian opsional)
L.Control.geocoder({
  defaultMarkGeocode: false,
  placeholder: "Cari lokasi PLN..."
}).on("markgeocode", function (e) {
  map.setView(e.geocode.center, 16);
}).addTo(map);

// === Tambahkan Marker dan Popup ===
locations.forEach(loc => {
  const popupContent = `
    <div class="popup-content">
      <h3>${loc.name}</h3>
      <div class="info-item"><i>📍</i> ${loc.address}</div>
      <div class="info-item"><i>🌐</i> ${loc.coords[0].toFixed(6)}, ${loc.coords[1].toFixed(6)}</div>
      <div class="info-item"><i>🏷️</i> ${loc.type}</div>
      <div class="info-item"><i>⏰</i> ${loc.hours}</div>
      <div class="popup-images">
        <img src="${loc.images[0]}" alt="Foto 1">
        <img src="${loc.images[1]}" alt="Foto 2">
      </div>
    </div>
  `;
  L.marker(loc.coords).addTo(map).bindPopup(popupContent);
});

// === Fungsi Pencarian ===
function searchLocation() {
  const input = document.getElementById("search-box").value.toLowerCase();
  const match = locations.find(loc => loc.name.toLowerCase().includes(input));

  if (match) {
    map.setView(match.coords, 16);

    const popupContent = `
      <div class="popup-content">
        <h3>${match.name}</h3>
        <div class="info-item"><i>📍</i> ${match.address}</div>
        <div class="info-item"><i>🌐</i> ${match.coords[0].toFixed(6)}, ${match.coords[1].toFixed(6)}</div>
        <div class="info-item"><i>🏷️</i> ${match.type}</div>
        <div class="info-item"><i>⏰</i> ${match.hours}</div>
        <div class="popup-images">
          <img src="${match.images[0]}" alt="Foto 1">
          <img src="${match.images[1]}" alt="Foto 2">
        </div>
      </div>
    `;
    L.popup({ maxWidth: 300 })
      .setLatLng(match.coords)
      .setContent(popupContent)
      .openOn(map);
  } else {
    alert("Lokasi tidak ditemukan. Coba cek ejaan atau nama lokasi.");
  }
}
function toggleDarkMode() {
  const body = document.body;
  const button = document.getElementById("darkModeBtn");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    button.innerHTML = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    button.innerHTML = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

// Load mode saat reload
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  const button = document.getElementById("darkModeBtn");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (button) button.innerHTML = "☀️ Light Mode";
  }
};
