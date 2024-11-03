import { obtenerPersonajes } from "./personaje-listar-api";
import { Personaje, personajes } from "./personaje.model";

const pintarPersonajes = async (personajes: Personaje[]): Promise<void> => {
  const contenedorPersonaje = document.querySelector("#contenedor-personajes");
  if (contenedorPersonaje && contenedorPersonaje instanceof HTMLDivElement) {
    contenedorPersonaje.innerHTML = "";

    if (personajes.length !== 0) {
      mostrarMensajeVacio(false);
      personajes.forEach((personaje) => {
        const tarjetaPersonaje = crearTarjetaPersonaje(personaje);
        contenedorPersonaje.appendChild(tarjetaPersonaje);
      });
    } else {
      mostrarMensajeVacio(true);
    }
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

const mostrarMensajeVacio = (mostrar: boolean) => {
  const mensaje = document.querySelector("#mensaje");
  if (mensaje && mensaje instanceof HTMLElement) {
    if (!mostrar) {
      mensaje.style.display = "none";
    } else {
      mensaje.textContent = "No se ha encontrado ningún personaje.";
      mensaje.style.display = "block";
    }
  }
};

const crearTarjetaPersonaje = (personaje: Personaje): HTMLDivElement => {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card");

  const divImagen = document.createElement("div");
  divImagen.classList.add("card-imagen");

  const imagen = document.createElement("img");
  imagen.src = `http://localhost:3000/${encodeURIComponent(personaje.imagen)}`;
  imagen.alt = personaje.nombre;
  divImagen.appendChild(imagen);
  tarjeta.appendChild(divImagen);

  const divTexto = document.createElement("div");
  divTexto.classList.add("card-info");

  const nombre = document.createElement("h2");
  nombre.innerText = personaje.nombre;
  divTexto.appendChild(nombre);

  const apodo = document.createElement("p");
  apodo.innerHTML = `<b>Apodo:</b> ${personaje.apodo}`;
  divTexto.appendChild(apodo);

  const especialidad = document.createElement("p");
  especialidad.innerHTML = `<b>Especialidad:</b> ${personaje.especialidad}`;
  divTexto.appendChild(especialidad);

  const amigo = document.createElement("p");
  amigo.innerHTML = `<b>Amigo:</b> ${personaje.amigo}`;
  divTexto.appendChild(amigo);

  const habilidades = document.createElement("p");
  habilidades.innerHTML = `<b>Habilidades:</b> ${personaje.habilidades.join( ", " )}`;
  divTexto.appendChild(habilidades);

  tarjeta.appendChild(divTexto);

  return tarjeta;
};

const mostrarPersonajes = () => {
  pintarPersonajes(personajes);
};

const almacenarPersonajes = async (): Promise<void> => {
  const resultado = await obtenerPersonajes();
  personajes.splice(0, resultado.length, ...resultado);
};

const normalizarTexto = (texto: string) => {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const filtrarPersonajes = (evento: Event) => {
  evento.preventDefault();
  const buscador = document.querySelector("#buscador");

  if (buscador && buscador instanceof HTMLInputElement) {
    const cadenaBusqueda = buscador.value;
    if (cadenaBusqueda !== "") {
      const cadenaBusquedaNormalizada = normalizarTexto(
        cadenaBusqueda.toLowerCase()
      );
      const personajesFiltrados = personajes.filter(
        (personaje) =>
          normalizarTexto(personaje.nombre.toLowerCase()).includes(
            cadenaBusquedaNormalizada
          ) ||
          normalizarTexto(personaje.apodo.toLowerCase()).includes(
            cadenaBusquedaNormalizada
          )
      );

      pintarPersonajes(personajesFiltrados);
    } else {
      alert("Introduce un valor");
    }
  }
};

const agregarEventoFiltro = () => {
  const formulario = document.querySelector("#formulario-buscador");
  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", filtrarPersonajes);
  } else {
    throw new Error("Error al filtrar personaje");
  }
};
const agregarEventoLimpiar = () => {
  const botonLimpiar = document.querySelector("#limpiar");

  if (botonLimpiar && botonLimpiar instanceof HTMLButtonElement) {
    botonLimpiar.addEventListener("click", limpiarBusqueda);
  }
};

const limpiarBusqueda = () => {
  const buscador = document.querySelector("#buscador");
  if (buscador && buscador instanceof HTMLInputElement) {
    buscador.value = "";
  }
  pintarPersonajes(personajes);
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await Promise.all([
      obtenerPersonajes(),
      almacenarPersonajes()
    ]);
    mostrarPersonajes();
    agregarEventoFiltro();
    agregarEventoLimpiar();
  } catch (error) {}
});
