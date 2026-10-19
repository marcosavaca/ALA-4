import { pedirNumero } from "./entrada.ts"
import { verDetalleTarea } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import {filtrarTareas} from "./validaciones.ts";
import {rl} from "./entrada.ts";

//funcion no pura:
export async function imprimirtarea(listaDeTareas: Tarea[],condicion: string | null,buscar:string | null): Promise<void>
    {

        const tareasFiltradas=filtrarTareas(listaDeTareas,condicion,buscar);
        if(tareasFiltradas.length===0) 
        {
         console.log("No hay tareas relacionadas a la busqueda\n");
            return;
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
        const entrada = await pedirNumero("Introduce el numero de la tarea o 0 para volver \n",0,tareasFiltradas.length);
    
        const indice = Number(entrada);
        if (indice===0)
        {
         return;
        }

        // Traducimos el indice de la lista filtrada al indice real dentro de listaDeTareas,
        // para que verDetalleTarea escriba el archivo con todas las tareas y no solo las filtradas.
        const tareaSeleccionada = tareasFiltradas[indice-1];
        const indiceOriginal = listaDeTareas.indexOf(tareaSeleccionada) + 1;

        await verDetalleTarea(listaDeTareas, indiceOriginal);
    }
// funcion no pura:
export async function pausa(mensaje: string): Promise<void> 
{
    await rl.question(mensaje);
}
//funcion no pura:
