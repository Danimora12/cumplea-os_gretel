/* ====== CONFIGURACIÓN: edita solo este bloque ====== */
const CONFIG = {
  fecha: "2026-10-24T19:30:00-06:00", // Costa Rica (UTC-6)
  whatsapp: "50687202676", // Número de Gretel: código de país + número, sin + ni espacios
  cumpleanera: "Gretel Ramirez",
  lugar: "El Circo Mexicano",
  mapsCorto: "https://maps.app.goo.gl/JMZvwQEWieqJfEha8",
  // Para precisión exacta, abre el link del lugar en Google Maps, copia las coordenadas y pégalas aquí:
  lat: 9.933080653776827,
  lng: -84.05714728301682,
  busqueda: "El Circo Mexicano, Costa Rica", // se usa para Waze si no hay coordenadas
  // URL del iframe oficial de Google Maps (Compartir > Insertar un mapa)
  embed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7860.021056707334!2d-84.05714728301682!3d9.933080653776827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e3b01b389b0d%3A0x788569e9a8a6caa6!2sEl%20Circo%20Mexicano!5e0!3m2!1ses-419!2scr!4v1791907336396!5m2!1ses-419!2scr",
};
/* ==================================================== */

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");

/* Cuenta regresiva */
const meta = new Date(CONFIG.fecha).getTime();
function tick() {
  const diff = meta - Date.now();
  if (diff <= 0) {
    $("reloj").hidden = true;
    $("fin").hidden = false;
    clearInterval(timer);
    return;
  }
  $("d").textContent = Math.floor(diff / 864e5);
  $("h").textContent = pad(Math.floor(diff / 36e5) % 24);
  $("m").textContent = pad(Math.floor(diff / 6e4) % 60);
  $("s").textContent = pad(Math.floor(diff / 1e3) % 60);
}
const timer = setInterval(tick, 1000);
tick();

/* WhatsApp con mensaje personalizado (acepta ?invitado=Nombre en el link) */
const nombre = $("nombre");
const invitado = new URLSearchParams(location.search).get("invitado");
if (invitado) nombre.value = invitado.slice(0, 40);

function actualizarWA() {
  const quien = nombre.value.trim();
  const msg =
    `¡Hola! ${quien ? "Soy " + quien + ". " : ""}Confirmo mi asistencia a tu  cumpleaños ` +
    `el sábado 24 de octubre a las 7:30 pm en ${CONFIG.lugar}. ¡Voy de negro y con la voz lista para cantar hasta el amanecer!`;
  $("btn-wa").href =
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}
nombre.addEventListener("input", actualizarWA);
actualizarWA();

/* Mapa y rutas */
const conCoords = CONFIG.lat !== null && CONFIG.lng !== null;
const destino = conCoords
  ? `${CONFIG.lat},${CONFIG.lng}`
  : encodeURIComponent(CONFIG.busqueda);

$("mapa").src = CONFIG.embed;
$("btn-gmaps").href = conCoords
  ? `https://www.google.com/maps/dir/?api=1&destination=${destino}&travelmode=driving`
  : CONFIG.mapsCorto;
$("btn-waze").href = conCoords
  ? `https://waze.com/ul?ll=${destino}&navigate=yes`
  : `https://waze.com/ul?q=${destino}&navigate=yes`;
