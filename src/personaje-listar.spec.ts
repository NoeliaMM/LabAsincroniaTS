import Axios, { AxiosError } from "axios";
import { vi } from "vitest";
import { Personaje } from "./personaje.model";
import { obtenerPersonajes } from "./personaje-listar-api";

describe("obtenerPersonajes", () => {
  it("Debería devolver personajes cuando la petición es correcta", async () => {
    // Arrange
    const personajeMock: Personaje[] = [
      {
        id: "1",
        nombre: "Mortadelo",
        apodo: "Mortadelo",
        especialidad: "Disfraces",
        habilidades: ["Camuflaje", "Imitaciones", "Huida rápida"],
        amigo: "Filemón",
        imagen: "mortadelo.webp",
      },
    ];
    vi.spyOn(Axios, "get").mockResolvedValue({
      data: personajeMock,
    });

    // Act
    const result = await obtenerPersonajes();

    // Assert
    expect(result).toEqual(personajeMock);
  });

  it('Debería devolver una error "Ha ocurrido un error al realizar la petición" cuando rechaza la petición con el código 403', async () => {
    // Arrange
    vi.spyOn(Axios, "get").mockRejectedValue({
      response: {
        status: 403,
      },
    } as AxiosError);
    
    // Act
    const result = await obtenerPersonajes();
    // Assert
    expect(result).toEqual("Ha ocurrido un error al realizar la petición");
  });
});
