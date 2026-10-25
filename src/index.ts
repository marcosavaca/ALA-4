import{pedir,validarFecha,validarNumero} from "./entrada.ts"
import {verTareas, agregarTarea, buscarTareas,ordenarTareas, ordenarPorFecha } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import { cargarTareas,escribirArchivo } from "./readwrite.ts";
import { createInterface,Interface } from "node:readline/promises";
import {imprimirTarea} from "./mostrar.ts";
const rl = createInterface({ input: process.stdin, output: process.stdout });
let listaDeTareas: Tarea[] = await cargarTareas();
//funcion no pura:
async function menu(rl:Interface,listaDeTareas:Tarea[]): Promise<void> 
{
        console.log("¡Hola Olivia!\n");
        console.log("¿Que deseas hacer?:\n");
        console.log("[1] Ver mis Tareas\n");
        console.log("[2] Buscar una Tarea\n");
        console.log("[3] Agregar una Tarea\n");
        console.log("[4] Ordenar tareas por:  \n");
        console.log("[0] Salir\n");
        const opcion= await pedir(rl,">\n",(e)=>validarNumero(e,0,4));
        switch (opcion) 
        {
            case 1: 
            return menu(rl,await verTareas(rl, listaDeTareas));
            break;
            case 2:
            return menu(rl,await buscarTareas(rl,listaDeTareas)); 
             break;
            case 3: 
                listaDeTareas = [...listaDeTareas, await agregarTarea(rl)]
                // escribir archivo:
                const {mensaje}= await escribirArchivo(listaDeTareas);
                if(mensaje===null)
                {
                console.log("¡Datos guardados!\n");
                }
                else
                {
                    console.log(`${mensaje} \n`);
                }
                return menu(rl,listaDeTareas);
            break;
            case 4:
                console.log("Por cual criterio desea ordenar?: \n");
                console.log("1- Por titulo de forma alfabetica \n");
                console.log("2- Por nivel \n");
                console.log("3- Por fecha creacion \n")
                const  criterio=await pedir(rl,">\n",(e)=> validarNumero(e,1,3));
                if(criterio!==3)
                {
                return menu(rl,await imprimirTarea(rl,false, listaDeTareas, ordenarTareas(criterio,listaDeTareas)));
                }
                else
                {
                return menu(rl,await imprimirTarea(rl,false, listaDeTareas, ordenarPorFecha(listaDeTareas)));
                }
            break;
            case 0: 
             break;
            default: 
            console.log("Ingrese una opcion valida");
             break;
        }
    }

menu(rl,listaDeTareas);




