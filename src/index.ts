import{cerrar,pedirNumero} from "./entrada.ts"
import { verTareas, buscarTareas, agregarTarea } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import{pausa,menu2} from "./mostrar.ts";
import { CargarTareas, escribirArchivo } from "./readwrite.ts";

async function menu(): Promise<void> 
{
    let salir = false;
    let listaDeTareas: Tarea[] = await CargarTareas();
    while (!salir) 
        {
        menu2();
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
                await pausa("Presione cualquier tecla para continuar... \n");
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




