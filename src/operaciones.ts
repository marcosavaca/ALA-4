import { pedir,validarDato, validarFecha, validarNumero } from "./entrada.ts";
import { Tarea } from "./tipos.ts";
import {control,resolverEdicion,resolverFecha, mantenerActualizarString,mantenerActualizarEntero,validacionFecha} from "./validaciones.ts"
import {imprimirTarea} from "./mostrar.ts";
import type { Interface } from "node:readline/promises";

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
        //converitmos en number dificultadus ya que validarDato devuelve solo string aunque vuelve como numero es string
        return crearTarea(titulous,descripcionus,estadous,fechaCreacion,ultimaEdicion,vencimiento,Number(dificultadus))
   
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
                    return await imprimirTarea(null,rl,listaDeTareas,null,null);
                    break;
                case 2:
                    return await imprimirTarea(null,rl,listaDeTareas,"P",null);
                    break;
                case 3:
                    return await imprimirTarea(null,rl,listaDeTareas,"E",null);
                    break;
                case 4:
                    return await imprimirTarea(null,rl,listaDeTareas,"T",null);
                    break;
                case 5:
                    return await imprimirTarea(null,rl,listaDeTareas,"C",null);
                    break;
                default:
                    console.log("Ingrese una opcion valida \n");
                    return listaDeTareas;
                    break;
            }
       
    }
//funcion no pura viene llama a impirmir tarea y despues detalletarea
export async function buscarTareas(rl:Interface, listaDeTareas:Tarea[]): Promise< Tarea[]>
{
       if (control(listaDeTareas))
        {
         return listaDeTareas;
        }
        const titulo= await pedir(rl,"Ingrese el titulo de la tarea a buscar \n",(e)=>validarDato(e,null,false));
        console.log("Que desea hacer?:\n");
        console.log("1: Buscar por titulo \n");
        console.log("2: Buscar por descripcion \n");
        console.log("3: Buscar por dificultad \n");
        const opcion=await pedir(rl,">\n",(e)=>validarNumero(e,1,3));
        if(opcion==1){
         return await imprimirTarea(null,rl,listaDeTareas,null,titulo);    
        }
        else{
        console.log("Ingrese la descripcion o la dificultad a buscar \n");
        const condicion=await pedir(rl,">\n",(e)=>validarDato(e,null,true));
         return await imprimirTarea(opcion,rl,listaDeTareas,condicion,null);
        }
        
    }

//funcion pura.
export function aplicarEdicion(tareaActual: Tarea, titulo: string, descripcion: string | null, estado: string, dificultad: number, fechaVencimiento: Date | null , fechaEdicion: Date): Tarea
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

function crearTarea(titulous: string, descripcionus: string | null, estadous: string | null, fechaCreacion: Date | null, ultimaEdicion: Date| null,vencimiento: string,dificultadus: number)
:Tarea{
    return new Tarea(
            titulous,
            descripcionus,
            estadous ||"P",
            fechaCreacion,
            ultimaEdicion,
            resolverFecha(vencimiento,null),
            Number(dificultadus) || 1
        );

}