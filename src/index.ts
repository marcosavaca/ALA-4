import{cerrar,pedirNumero,pedirDato} from "./entrada.ts"
import { verTareas, buscarTareas, agregarTarea } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import { CargarTareas, escribirArchivo } from "./readwrite.ts";
//funcion no pura:
async function menu(): Promise<void> 
{
    let salir = false;
    let listaDeTareas: Tarea[] = await CargarTareas();
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
            case 3: 
                const nuevaTarea = await agregarTarea();
                listaDeTareas.push(nuevaTarea);
                await escribirArchivo(listaDeTareas);
                console.log("¡Datos guardados en el archivo!.\n");
                console.log("Presiona cualquier tecla para continuar ...\n");
                const dato=await pedirDato("> \n",null,false);
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




