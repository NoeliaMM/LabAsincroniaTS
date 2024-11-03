import axios from "axios";
import { Personaje} from "./personaje.model";


export const obtenerPersonajes = async () : Promise<Personaje[] | string> => {

    try {
        const {data} = await axios.get("http://localhost:3000/personajes");        
        return data;
       
    } catch (error) {
        console.error("Error al obtener los personajes",error);
        return "Ha ocurrido un error al realizar la petición";
    }
}

