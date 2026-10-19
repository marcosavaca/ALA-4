import { pedirDato,pedirFecha,pedirNumero,entradaDatosTarea } from "./entrada.ts";
import { Tarea } from "./tipos.ts";
import {control,resolverEdicion,resolverFecha, mantenerActualizarString,mantenerActualizarEntero} from "./validaciones.ts"
import {imprimirtarea,pausa,menu_mostrar} from "./mostrar.ts";
import {escribirArchivo} from "./readwrite.ts";

//funcion no pura
export async function agregarTarea():Promise<Tarea> 
    {
        console.log("Estas creando una nueva tarea.\n");
        
        const {titulous,descripcionus,estadous,vencimiento,dificultadus,fechaCreacion,ultimaEdicion}=await entradaDatosTarea();
        // ahora llamamos al constructor s
       let nuevaTarea = new Tarea(
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
export async function verTareas(listaDeTareas: Tarea[]): Promise<void>
    {
        if (control(listaDeTareas))
        {
         return;
        }
        await menu_mostrar(false);
        let opcion= await pedirNumero("> \n",undefined,undefined);
        if (opcion===0)
        { 
        return;
        }

        switch(opcion)
        {
            case 1:
                await imprimirtarea(listaDeTareas,null,null);
                break;
            case 2:
                await imprimirtarea(listaDeTareas,"P",null);
                break;
            case 3:
                await imprimirtarea(listaDeTareas,"E",null);
                break;
            case 4:
                await imprimirtarea(listaDeTareas,"T",null);
                break;
            case 5:
                await imprimirtarea(listaDeTareas,"C",null);
                break;
            default:
                 console.log("Ingrese una opcion valida \n");
                break;
        }
    }
// funcion no pura
export async function verDetalleTarea(listaDeTareas: Tarea[],indice: number): Promise<void>
    {
        if (!listaDeTareas[indice-1]) 
        {
            console.log("Tarea no encontrada.\n");
            return;
        }
        // En tipos2 se pondria: listaDeTareas[indice-1].mostrarDetalle();
        listaDeTareas[indice-1].mostrarDetalle();  //Ahora a cada instancia de la tarea tiene su propio comportamiento de mostrar sus atributos
        console.log("Si deseas editarla presione E o 0 para volver. \n");
        let entrada =await pedirDato( ">  \n", ["E","0"],true);
        if(entrada==="0")
        {
            return;
        }
        
        console.log(`Estas editando la tarea: ${listaDeTareas[indice-1].titulo}  \n`);
        console.log("-Si deseas mantener los valores de un atributo, simplemente dejalo en blanco (no espacio) \n");
        console.log("-Si deseas dejar en blanco un atributo, escribe un espacio. \n");
        // A los atributos que pueden sar vacios se les agrega a opciones validas un espacio: " ".
        let nuevoTitulo= await pedirDato( "1. Nuevo titulo:\n", null, true);
        const nuevaDescripcion= await pedirDato( "2. Descripción:\n", null, false);
        const nuevoEstado=await pedirDato( "3. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada) o dejalo en blanco para mantener(no espacio) \n", ["P", "E", "T", "C",""], true);
        const nuevaDificultad = await pedirDato( "4. Dificultad ([1]/[2]/[3]) o dejalo en blanco para mantener(no espacio) \n", ["1", "2", "3",""],true);
        const vencimiento=await pedirFecha("5.Ingrese fecha de vencimiento (AAAA-MM-DD)\n", true);
       
        const titulo=mantenerActualizarString(nuevoTitulo,listaDeTareas[indice-1].titulo);
        const estado=mantenerActualizarString(nuevoEstado,listaDeTareas[indice-1].estado);
        const dificultad=mantenerActualizarEntero(nuevaDificultad,listaDeTareas[indice-1].dificultad);
        listaDeTareas[indice-1] = aplicarEdicion(listaDeTareas[indice-1],titulo,resolverEdicion(nuevaDescripcion, listaDeTareas[indice-1].descripcion),estado,Number(dificultad),resolverFecha(vencimiento,listaDeTareas[indice-1].fechaVencimiento), new Date());
        //Escribimos nuevamente:
        await escribirArchivo(listaDeTareas);
        console.log("¡Datos guardados!\n");
        await pausa("Presiona cualquier tecla para continuar ...\n");
            
    }
//funcion pura:
export async function buscarTareas(listaDeTareas: Tarea[]): Promise<void>
    {
        if (control(listaDeTareas))
        {
         return;
        }
        let titulo= await pedirDato("Ingrese el titulo de la tarea a buscar \n",null,false);
        // La condicion es null ya que no estamos imprimiendo todas las tareas o por condicion solo buscamos:
        await imprimirtarea(listaDeTareas,null,titulo);

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