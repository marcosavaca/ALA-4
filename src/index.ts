import{pedir,validarNumero} from "./entrada.ts"
import { verTareas, buscarTareas, agregarTarea } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import { CargarTareas } from "./readwrite.ts";
import { createInterface } from "node:readline/promises";
import fs from 'fs/promises';
//funcion no pura:
async function menu(): Promise<void> 
{
    const rl = createInterface({ input: process.stdin, output: process.stdout });
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
        const opcion= await pedir(rl,">\n",(e)=>validarNumero(e,0,3));
        switch (opcion) 
        {
            case 1: listaDeTareas=await verTareas(rl,listaDeTareas); 
            break;
            case 2:listaDeTareas=await buscarTareas(rl,listaDeTareas); 
             break;
            case 3: 
                listaDeTareas = [...listaDeTareas, await agregarTarea(rl)]
                // escribir archivo:
                const contenido = JSON.stringify(listaDeTareas, null, 2);
                try 
                {
                await fs.writeFile('./archivos/tasks.json', contenido,"utf-8");
                
                } catch (error) 
                {
                 console.log(`error : ${error} `);
                }   
                console.log("¡Datos guardados en el archivo!.\n");
                console.log("Presiona cualquier tecla para continuar ...\n");
            break;
            case 0: 
             salir = true; 
             break;
            default: console.log("Ingrese una opcion valida"); break;
        }
    }
    rl.close();
}

menu();




