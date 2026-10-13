import{cerrar,pedirNumero} from "./entrada.ts"
import { verTareas, buscarTareas, agregarTarea } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import { CargarTareas } from "./readwrite.ts";

async function menu(): Promise<void> 
{
    let salir = false;
    const listaDeTareas: Tarea[] = await CargarTareas();
    while (!salir) 
        {
        console.log("¡Hola Olivia!\n");
        console.log("¿Que deseas hacer?:\n");
        console.log("[1] Ver mis Tareas\n");
        console.log("[2] Buscar una Tarea\n");
        console.log("[3] Agregar una Tarea\n");
        console.log("[0] Salir\n");
        let opcion = await pedirNumero(">\n",undefined,undefined);
        switch (opcion) 
        {
            case 1: await verTareas(listaDeTareas); 
            break;
            case 2: await buscarTareas(listaDeTareas); 
             break;
            case 3: await agregarTarea(listaDeTareas); 
             break;
            case 0: 
             salir = true; 
             break;
            default: console.log("Ingrese una opcion valida"); break;
        }
    }
    cerrar();
}

menu();




