import{pedir,validarFecha,validarNumero} from "./entrada.ts"
import {verTareas, agregarTarea, buscarTareas,ordenarTareas, ordenarPorFecha } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import { cargarTareas,escribirArchivo } from "./readwrite.ts";
import { createInterface } from "node:readline/promises";
import {imprimirTarea} from "./mostrar.ts";
//funcion no pura:
async function menu(): Promise<void> 
{
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    let salir = false;
    let listaDeTareas: Tarea[] = await cargarTareas();
    while (!salir) 
        {
        console.log("¡Hola Olivia!\n");
        console.log("¿Que deseas hacer?:\n");
        console.log("[1] Ver mis Tareas\n");
        console.log("[2] Buscar una Tarea\n");
        console.log("[3] Agregar una Tarea\n");
        console.log("[4] Ordenar tareas por:  \n");
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
                const mensaje= await escribirArchivo(listaDeTareas);
                if(mensaje===null)
                {
                console.log("¡Datos guardados!\n");
                }
                else
                {
                    console.log(`${mensaje} \n`);
                }
            case 4:
                console.log("Por cual criterio desea ordenar?: \n");
                console.log("1- Por titulo de forma alfabetica \n");
                console.log("2- Por nivel \n");
                console.log("3- Por fecha creacion \n")
                const  criterio=await pedir(rl,">\n",(e)=> validarNumero(e,1,3));
                if(criterio!==3)
                {
                imprimirTarea(rl,false, listaDeTareas, ordenarTareas(criterio,listaDeTareas));
                }
                else
                {
                imprimirTarea(rl,false, listaDeTareas, ordenarPorFecha(listaDeTareas));
                }
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




