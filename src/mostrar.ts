import { pedirNumero } from "./entrada.ts"
import { verDetalleTarea } from "./operaciones.ts";
import type { Tarea } from "./tipos.ts";
import {rl} from "./entrada.ts";


export async function imprimirtarea(listaDeTareas: Tarea[],condicion: string | null,buscar:string | null): Promise<void>
    {
        const tareasFiltradas = [];

        for (let i=0; i<listaDeTareas.length; i++) 
        {
            if(buscar!==null) //Si estamos buscando entonces en la variable buscar se tiene el titulo de la tarea a buscar.
            {
              if(buscar.trim() !== "" && listaDeTareas[i].coincideTitulo(buscar))
                {
                    //añadimos a la tarea filtrada.
       
                 tareasFiltradas.push(listaDeTareas[i]);
                }
            } 
            else 
            {
                // Si no estamso buscando y estamos viendo todas las tareas ya sea todas(null),Pendiente,En curso, Finalizadas:
              if(listaDeTareas[i].coincideEstado(condicion))
                {
                    //añadimso todas las tareas solo que cumpla la condicion o todas.
                    tareasFiltradas.push(listaDeTareas[i]);
                }
            }
        }
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
        let entrada = await pedirNumero("Introduce el numero de la tarea o 0 para volver \n",0,tareasFiltradas.length);
    
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

export async function pausa(mensaje: string): Promise<void> 
{
    await rl.question(mensaje);
}

export async function menu(): Promise<void>
{
    console.log("¿Que tareas deseas ver?:\n");
    console.log("[1] Todas \n");
    console.log("[2] Pendientes \n");
    console.log("[3] En curso \n");
    console.log("[4] Terminadas \n");
    console.log("[5] Canceladas \n");
    console.log("[0] Volver \n");
}
export async function menu2(): Promise<void>
{
    console.log("¡Hola Olivia!\n");
    console.log("¿Que deseas hacer?:\n");
    console.log("[1] Ver mis Tareas\n");
    console.log("[2] Buscar una Tarea\n");
    console.log("[3] Agregar una Tarea\n");
    console.log("[0] Salir\n");
}