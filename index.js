const $contenedorJugadores = document.querySelector(".contenedor-jugadores");
const $template = document.querySelector(".template-jugadores").content;
const fragment = document.createDocumentFragment();
const $jugadores = document.querySelectorAll(".jugador");

const jugadoresClickeado = [];
let ronda = 0;

document.addEventListener("DOMContentLoaded", () => {
  obtenerJugadores();
});
const obtenerJugadores = () => {
  fetch("./jugadores.json")
    .then((res) => res.json())
    .then((jugadores) => renderizarJugadores(jugadores));
};

const renderizarJugadores = (jugadores) => {
  const jugadoresConcatenados = jugadores.concat(jugadores);
  const jugadoresBarajados = barajarJugadores(jugadoresConcatenados);

  jugadoresBarajados.forEach((jugador) => {
    $template.querySelector(".dorso img").setAttribute("src", jugador.img);
    $template.querySelector(".frente img").setAttribute("src", jugador.logo);
    $template.querySelector(".frente img").dataset.nombre = jugador.nombre;

    const clon = $template.cloneNode(true);
    fragment.appendChild(clon);
  });
  $contenedorJugadores.appendChild(fragment);
};

const barajarJugadores = (jugador) => {
  return jugador.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

$contenedorJugadores.addEventListener("click", (e) => {
  const $jugadorClickeado = e.path[0].dataset.nombre;
  if ($jugadorClickeado) {
    chequearJugadores($jugadorClickeado);
  }
});

const chequearJugadores = (e) => {
  jugadoresClickeado.push(e);
};
