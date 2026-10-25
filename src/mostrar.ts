import { pedir,validarDato, validarFecha, validarNumero } from "./entrada.ts";
import { Tarea } from "./tipos.ts";
import {resolverEdicion,resolverFecha, mantenerActualizarString,mantenerActualizarEntero} from "./validaciones.ts"
import type { Interface } from "node:readline/promises";
import { aplicarEdicion } from "./operaciones.ts";
import { escribirArchivo } from "./readwrite.ts";

//funcion no pura:
export async function imprimirTarea(rl:Interface,tituloBuscar:boolean,listaDeTareas: Tarea[],tareasFiltradas:Tarea[]): Promise<Tarea[]>
    {

        if(tareasFiltradas.length===0) 
        {
         console.log("No hay tareas relacionadas a la busqueda\n");
            return listaDeTareas;
        }
        //Si es buscar o imprimir todas las tareas o por condicion cambia el mensaje:
        if(tituloBuscar) 
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
        const entrada = await pedir(rl,"Introduce el numero de la tarea o 0 para volver \n",(e)=> validarNumero(e,0,tareasFiltradas.length));
    
        const indice = Number(entrada);
        if (indice===0)
        {
         return listaDeTareas;
        }

        // Traducimos el indice de la lista filtrada al indice real dentro de listaDeTareas,
        // para que verDetalleTarea escriba el archivo con todas las tareas y no solo las filtradas.
        const tareaSeleccionada = tareasFiltradas[indice-1];
        const indiceEditar = listaDeTareas.indexOf(tareaSeleccionada);
        if (!listaDeTareas[indiceEditar]) 
        {
                console.log("Tarea no encontrada.\n");
                return listaDeTareas;
        }
            
            listaDeTareas[indiceEditar].mostrarDetalle();  //Ahora a cada instancia de la tarea tiene su propio comportamiento de mostrar sus atributos
            console.log("Si deseas editarla presione E o 0 para volver. \n");
            const entrada2 =await pedir(rl, ">  \n",(e)=>validarDato(e,["E","0"],true));
            if(entrada2==="0")
            {
                return listaDeTareas;
            }
            
            console.log(`Estas editando la tarea: ${listaDeTareas[indiceEditar].titulo}  \n`);
            console.log("-Si deseas mantener los valores de un atributo, simplemente dejalo en blanco (no espacio) \n");
            console.log("-Si deseas dejar en blanco un atributo, escribe un espacio. \n");
            // A los atributos que pueden sar vacios se les agrega a opciones validas un espacio: " ".
            const nuevoTitulo= await pedir (rl,"1. Nuevo titulo:\n",(e)=>validarDato(e,null, true));
            const nuevaDescripcion= await pedir (rl,"2. Nueva descripcion:\n",(e)=>validarDato(e,null,false));
            const nuevoEstado=await pedir(rl, "3. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada) o dejalo en blanco para mantener(no espacio) \n",(e)=>validarDato(e, ["P", "E", "T", "C",""], true));
            const nuevaDificultad = await pedir(rl, "4. Dificultad ([1]/[2]/[3]) o dejalo en blanco para mantener(no espacio) \n",(e)=>validarDato(e,["1", "2", "3",""],true));
            const vencimiento=await pedir(rl,"5.Ingrese fecha de vencimiento (AAAA-MM-DD)\n",(e)=>validarFecha(e,true,new Date()));
           
            const titulo=mantenerActualizarString(nuevoTitulo,listaDeTareas[indiceEditar].titulo);
            const estado=mantenerActualizarString(nuevoEstado,listaDeTareas[indiceEditar].estado);
            const dificultad=mantenerActualizarEntero(nuevaDificultad,listaDeTareas[indiceEditar].dificultad);
            const tareaEditada = aplicarEdicion(listaDeTareas[indice-1],titulo,resolverEdicion(nuevaDescripcion, listaDeTareas[indiceEditar].descripcion),estado,Number(dificultad),resolverFecha(vencimiento,listaDeTareas[indice-1].fechaVencimiento), new Date());
            //Escribimos nuevamente:
            const listaActualizada = listaDeTareas.map((tarea, i) => i === indiceEditar ? tareaEditada : tarea);
            // escribir archivo:
            const mensaje=escribirArchivo(listaActualizada);
            if(mensaje===null)
            {
            console.log("¡Datos guardados!\n");
            }
            else
            {
                console.log(`${mensaje} \n`);
            }
            return listaActualizada;
    }

