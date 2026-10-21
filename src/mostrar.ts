import { pedir,validarNumero } from "./entrada.ts"
import { verDetalleTarea } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import {filtrarTareas} from "./validaciones.ts";
import type { Interface } from "node:readline/promises";

//funcion no pura:
export async function imprimirtarea(rl:Interface,listaDeTareas: Tarea[],condicion: string | null,buscar:string | null): Promise<Tarea[]>
    {

        const tareasFiltradas=filtrarTareas(listaDeTareas,condicion,buscar);
        if(tareasFiltradas.length===0) 
        {
         console.log("No hay tareas relacionadas a la busqueda\n");
            return listaDeTareas;
        }
        //Si es buscar o imprimir todas las tareas o por condicion cambia el mensaje:
        if(buscar) 
        {
         console.log("Estas son las tareas relacionadas!: \n");
        } 
        else 
        {
         console.log("Estas son todas tus tareas!: \n");
        }

        for (let i=0;i<tareasFiltradas.length;i++) 
        {
        
            console.log(`${[i+ 1]} ${tareasFiltradas[i].titulo} \n`);
            
        }

        console.log("¿Deseas ver los detalles de alguna? \n");
        const entrada = await pedir(rl,"Introduce el numero de la tarea o 0 para volver \n",(e)=> validarNumero(e,0,tareasFiltradas.length));
    
        const indice = Number(entrada);
        if (indice===0)
        {
         return listaDeTareas;
        }

        // Traducimos el indice de la lista filtrada al indice real dentro de listaDeTareas,
        // para que verDetalleTarea escriba el archivo con todas las tareas y no solo las filtradas.
        const tareaSeleccionada = tareasFiltradas[indice-1];
        const indiceOriginal = listaDeTareas.indexOf(tareaSeleccionada) + 1;
        // retorna a verTareas o a busqueada.
        return await verDetalleTarea(rl,listaDeTareas, indiceOriginal);
    }

