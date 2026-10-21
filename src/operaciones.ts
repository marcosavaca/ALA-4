import { pedir,validarDato, validarFecha, validarNumero } from "./entrada.ts";
import { Tarea } from "./tipos.ts";
import {control,resolverEdicion,resolverFecha, mantenerActualizarString,mantenerActualizarEntero,validacionFecha} from "./validaciones.ts"
import {imprimirtarea} from "./mostrar.ts";
import type { Interface } from "node:readline/promises";
import fs from 'fs/promises';
//funcion no pura
export async function agregarTarea(rl:Interface):Promise<Tarea> 
    {
        
        console.log("Estas creando una nueva tarea.\n");
         const titulous=await pedir(rl, "1. Título:\n", (e) => validarDato(e, null, true));
         const descripcionus= await pedir(rl,"2. Descripción:\n",(e) =>validarDato(e,null,false));
            //Los que no pueden ser vascios y tienen valores por defecto a opciones validas se les coloca "".
         const estadous=await pedir(rl,"3. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada):\n",(e)=>validarDato(e,["P", "E", "T", "C",""],true));
         const vencimiento = await pedir(rl,"4.Ingrese fecha de vencimiento (AAAA-MM-DD) o presione Enter para omitir:\n",(e)=>validarFecha(e,null,new Date()));
         const dificultadus = await pedir(rl,"5. Dificultad ([1]/[2]/[3]):\n",(e)=>validarDato(e,["1", "2", "3",""],true));
         const fechaCreacionus = await pedir(rl,"6.¿Desea agregar fecha de creación? [S]í / [N]o:\n",(e)=>validarDato(e, ["S", "N"],false));
         const ultimaEdicionus = await pedir(rl,"7.¿Desea agregar fecha de edicion? [S]í / [N]o:\n",(e)=>validarDato(e, ["S", "N"],false));
         const{ fechaCreacion, ultimaEdicion }=validacionFecha(fechaCreacionus,ultimaEdicionus,new Date()); 
        // ahora llamamos al constructor s
       const nuevaTarea = new Tarea(
            titulous,
            descripcionus,
            estadous ||"P",
            fechaCreacion,
            ultimaEdicion,
            resolverFecha(vencimiento,null),
            Number(dificultadus) || 1
        );
        return nuevaTarea;
    }


// funcion no pura:
export async function verTareas(rl:Interface,listaDeTareas: Tarea[]): Promise<Tarea[]>
    {
        
        if (control(listaDeTareas))
        {
         return listaDeTareas;
        }
        console.log("¿Que tareas deseas ver?:\n");
        console.log("[1] Todas \n");
        console.log("[2] Pendientes \n");
        console.log("[3] En curso \n");
        console.log("[4] Terminadas \n");
        console.log("[5] Canceladas \n");
        console.log("[0] Volver \n");
        const opcion= await pedir(rl,">\n",(e)=>validarNumero(e,0,4));
        if (opcion===0)
        { 
        return listaDeTareas;
        }

        switch(opcion)
        {
            case 1:
                return await imprimirtarea(rl,listaDeTareas,null,null);
                break;
            case 2:
                return await imprimirtarea(rl,listaDeTareas,"P",null);
                break;
            case 3:
                 return await imprimirtarea(rl,listaDeTareas,"E",null);
                break;
            case 4:
                return await imprimirtarea(rl,listaDeTareas,"T",null);
                break;
            case 5:
                return await imprimirtarea(rl,listaDeTareas,"C",null);
                break;
            default:
                 console.log("Ingrese una opcion valida \n");
                return listaDeTareas;
                break;
        }
    }
// funcion no pura, retorna a imprimirtarea.
export async function verDetalleTarea(rl:Interface,listaDeTareas: Tarea[],indice: number): Promise<Tarea[]>
    {
        if (!listaDeTareas[indice-1]) 
        {
            console.log("Tarea no encontrada.\n");
            return listaDeTareas;
        }
        // En tipos2 se pondria: listaDeTareas[indice-1].mostrarDetalle();
        listaDeTareas[indice-1].mostrarDetalle();  //Ahora a cada instancia de la tarea tiene su propio comportamiento de mostrar sus atributos
        console.log("Si deseas editarla presione E o 0 para volver. \n");
        const entrada =await pedir(rl, ">  \n",(e)=>validarDato(e,["E","0"],true));
        if(entrada==="0")
        {
            return listaDeTareas;
        }
        
        console.log(`Estas editando la tarea: ${listaDeTareas[indice-1].titulo}  \n`);
        console.log("-Si deseas mantener los valores de un atributo, simplemente dejalo en blanco (no espacio) \n");
        console.log("-Si deseas dejar en blanco un atributo, escribe un espacio. \n");
        // A los atributos que pueden sar vacios se les agrega a opciones validas un espacio: " ".
        const nuevoTitulo= await pedir (rl,"1. Nuevo titulo:\n",(e)=>validarDato(e,null, true));
        const nuevaDescripcion= await pedir (rl,"2. Nueva descripcion:\n",(e)=>validarDato(e,null,false));
        const nuevoEstado=await pedir(rl, "3. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada) o dejalo en blanco para mantener(no espacio) \n",(e)=>validarDato(e, ["P", "E", "T", "C",""], true));
        const nuevaDificultad = await pedir(rl, "4. Dificultad ([1]/[2]/[3]) o dejalo en blanco para mantener(no espacio) \n",(e)=>validarDato(e,["1", "2", "3",""],true));
        const vencimiento=await pedir(rl,"5.Ingrese fecha de vencimiento (AAAA-MM-DD)\n",(e)=>validarFecha(e,null,new Date()));
       
        const titulo=mantenerActualizarString(nuevoTitulo,listaDeTareas[indice-1].titulo);
        const estado=mantenerActualizarString(nuevoEstado,listaDeTareas[indice-1].estado);
        const dificultad=mantenerActualizarEntero(nuevaDificultad,listaDeTareas[indice-1].dificultad);
        const tareaEditada = aplicarEdicion(listaDeTareas[indice-1],titulo,resolverEdicion(nuevaDescripcion, listaDeTareas[indice-1].descripcion),estado,Number(dificultad),resolverFecha(vencimiento,listaDeTareas[indice-1].fechaVencimiento), new Date());
        //Escribimos nuevamente:
        const listaActualizada = listaDeTareas.map((tarea, i) => i === indice-1 ? tareaEditada : tarea);
        // escribir archivo:
        const contenido = JSON.stringify(listaActualizada, null, 2);
         try 
            {
                await fs.writeFile('./archivos/tasks.json', contenido,"utf-8");
                        
            } catch (error) 
            {
             console.log(`error : ${error} `);
            }   

        console.log("¡Datos guardados!\n");
        return listaActualizada;
            
    }
//funcion no pura:
export async function buscarTareas(rl:Interface,listaDeTareas: Tarea[]): Promise<Tarea[]>
    {
        if (control(listaDeTareas))
        {
         return listaDeTareas;
        }
        const titulo= await pedir(rl,"Ingrese el titulo de la tarea a buscar \n",(e)=>validarDato(e,null,false));
        // La condicion es null ya que no estamos imprimiendo todas las tareas o por condicion solo buscamos:
        return await imprimirtarea(rl,listaDeTareas,null,titulo);

    }

//funcion pura.
 function aplicarEdicion(tareaActual: Tarea, titulo: string, descripcion: string | null, estado: string, dificultad: number, fechaVencimiento: Date | null , fechaEdicion: Date): Tarea
{
    return tareaActual.editar(
        titulo,
        descripcion,
        estado,
        tareaActual.fechaCreacion,
        fechaEdicion,
        fechaVencimiento,
        dificultad
    );
}