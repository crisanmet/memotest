const URL = "http://127.0.0.1:8080/";
const NUMERO_JUGADORES = 10;

context("Memotest", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("Se inicia juego Memotest", () => {
    it("Nos aseguramos que haya un contenedor jugador con jugadores", () => {
      cy.get(".contenedor-jugadores")
        .find(".jugador")
        .should("have.length", NUMERO_JUGADORES);
    });
    it("Nos aseguramos que los jugadores sean barajados correctamente", () => {
      let jugadoresOriginales = [];
      let jugadoresNuevos = [];
      cy.get(".frente img").then((jugadores) => {
        jugadores.each((i, jugador) => {
          jugadoresOriginales.push(jugador.id);
        });
      });
      cy.visit(URL);

      cy.get(".frente img").then((jugadores) => {
        jugadores.each((i, jugador) => {
          jugadoresNuevos.push(jugador.id);
        });
      });

      cy.wrap(jugadoresOriginales).should("not.deep.equal", jugadoresNuevos);
    });
  });
  describe("Resolvemos el juego", () => {
    let mapaJugadores;
    let listaJugadores;
    it("Elegimos una combinación errónea", () => {
      cy.get(".frente img").then((jugador) => {
        mapaJugadores = obtenerParesDeJugadores(jugador);
        listaJugadores = Object.values(mapaJugadores);
        console.log(listaJugadores);

        cy.get(listaJugadores[0][0]).click();
        cy.get(listaJugadores[1][0]).click();

        cy.get(".jugador").should("have.length", NUMERO_JUGADORES);
      });
    });
    it("Por último, resolvemos el juego", () => {
      cy.get(".jugador").should("have.length", NUMERO_JUGADORES);

      listaJugadores.forEach((jugador) => {
        cy.get(jugador[0]).click();
        cy.get(jugador[1]).click();
      });
    });
  });
});

const obtenerParesDeJugadores = (jugadores) => {
  const paresJugadores = {};

  jugadores.each((i, jugador) => {
    const idJugador = jugador.id;

    if (paresJugadores[idJugador])
      paresJugadores[idJugador].push(jugador.parentElement.parentElement);
    else paresJugadores[idJugador] = [jugador.parentElement.parentElement];
  });

  return paresJugadores;
};
