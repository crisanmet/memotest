const $contenedorJugadores = document.querySelector(".contenedor-jugadores");
const $template = document.querySelector(".template-jugadores").content;
const $mensajeFinal = document.querySelector(".mensaje-final");
const fragment = document.createDocumentFragment();

let jugadoresClickeados = [];
let ronda = 0;
let aciertos = 0;

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
    $template.querySelector(".frente img").id = jugador.nombre;

    const clon = $template.cloneNode(true);
    fragment.appendChild(clon);
  });
  $contenedorJugadores.appendChild(fragment);
};

const barajarJugadores = (jugador) => {
  return jugador.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

$contenedorJugadores.addEventListener("click", (e) => {
  const $jugadorClickeado =
    e.target.parentElement.parentElement.classList.contains("jugador");
  if ($jugadorClickeado) {
    manejarClickUsuario(e.target);
  }
});

const manejarClickUsuario = (jugador) => {
  mostrarJugador(jugador.parentElement.parentElement);
  jugadoresClickeados.push(jugador);

  if (jugadoresClickeados.length === 2) {
    evaluarCoincidencia(jugadoresClickeados);
  }
};

const mostrarJugador = (jugador) => {
  jugador.classList.add("rotar-jugador");
  jugador.classList.add("bloquear-pointer");
};

const evaluarCoincidencia = (jugadores) => {
  if (jugadores[0].id === jugadores[1].id) {
    eliminarJugadores(jugadores);
  } else {
    ocultarJugador(jugadores);
  }
  ronda++;
};

const eliminarJugadores = (jugadores) => {
  jugadores.forEach((e) => {
    setTimeout(() => {
      e.parentElement.parentElement.classList.add("acierto");
    }, 500);
  });
  aciertos++;
  jugadoresClickeados = [];
  chequearFinJuego();
};

const ocultarJugador = (jugadores) => {
  jugadores.forEach((e) =>
    setTimeout(() => {
      e.parentElement.parentElement.classList.remove("rotar-jugador");
      e.parentElement.parentElement.classList.remove("bloquear-pointer");
    }, 500)
  );
  jugadoresClickeados = [];
};

const chequearFinJuego = () => {
  if (document.querySelectorAll(".jugador").length / 2 === aciertos) {
    $mensajeFinal.textContent = `Felicitaciones! Sos mas bostero que la raulito. Lo completaste en ${ronda} Rondas`;
  }
};
