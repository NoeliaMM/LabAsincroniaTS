export interface Personaje  {
    id: string,
    nombre: string,
    apodo: string,
    especialidad: string,
    habilidades:Array<string>,
    amigo: string,
    imagen: string
}

export let personajes: Personaje[] = [];