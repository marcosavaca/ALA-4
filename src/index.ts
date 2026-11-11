import{pedir,validarFecha,validarNumero} from "./entrada.ts"
import {verTareas, agregarTarea, buscarTareas,ordenarTareas } from "./operaciones.ts";
import { Tarea } from "./tipos.ts";
import { cargarTareas,escribirArchivo } from "./readwrite.ts";
import { createInterface,Interface } from "node:readline/promises";
import {imprimirTarea} from "./mostrar.ts";



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
        // pedir es funcion de orden superior aunque se llame a la funcion con los parametros ya que se hace un puente (e)=>.
        const opcion= await pedir(rl,">\n",(e)=>validarNumero(e,0,4));
        switch (opcion) 
        {
            case 1: 
            //recursividad, no es funcion de orden superior.
            return menu(rl,await verTareas(rl, listaDeTareas));
            break;
            case 2:
           //recursividad, no es funcion de orden superior.
            return menu(rl,await buscarTareas(rl,listaDeTareas)); 
             break;
            case 3: 
                // Aca se cumple la inmutabilidad ya que es una copia listaNueva y no es la original.
                const listaNueva = [...listaDeTareas, await agregarTarea(rl)]; 
                // escribir archivo:
                const {mensaje}= await escribirArchivo(listaNueva);
                if(mensaje===null)
                {
                console.log("¡Datos guardados!\n");
                }
                else
                {
                    console.log(`${mensaje} \n`);
                }
                //recursividad, no es funcion de orden superior.
                return menu(rl,listaNueva);
            break;
            case 4:
                console.log("Por cual criterio desea ordenar?: \n");
                console.log("1- Por titulo de forma alfabetica \n");
                console.log("2- Por nivel \n");
                console.log("3- Por fecha creacion \n")
                const  criterio=await pedir(rl,">\n",(e)=> validarNumero(e,1,3));
                ordenarTareas(criterio,listaDeTareas);
            break;
            case 0: 
                return;
             break;
            default: 
            console.log("Ingrese una opcion valida");
            return menu(rl, listaDeTareas);
             break;
        }
    }
const rl = createInterface({ input: process.stdin, output: process.stdout });
try
{
    await menu(rl, await cargarTareas());
}
catch (error)
{
    console.log(`Ocurrio un error inesperado: ${error}`);
}
finally
{
    rl.close();
}




