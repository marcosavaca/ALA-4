import  { Tarea } from "./tipos.ts";


// funcion pura
export function control(listaDeTareas: Tarea[]): boolean {
    if (listaDeTareas.length === 0) 
    {
        
        return true;
    }
    return false;
}
//funcion pura
export function esVacio(valor: string| Date | null, mensaje:string): string
    {
        if(valor===null || valor===undefined)
        {
         return `${mensaje}: Sin datos \n`;
        }
        if (valor instanceof Date)  //un fecha no se deja vacia y por default se poone la fecha de creacion.
        {
            return `${mensaje}: ${valor} \n`;
        }
        if(typeof valor === "string")
        {
            if (valor.trim() === "")
            {
                return `${mensaje}: Sin datos \n`;
            }  // si es un string y espacio en blanco entonces es vacio.
        }
        // si no cumple que sea nulo o stirng y espacio en blanco entonces es falso.
        return `${mensaje}: ${valor} \n`;
    }
    // funcion pura
export function resolverEdicion(entrada: string, valorAnterior:string | null):string | null
    {
      // mantener
        if (entrada === "")
        {
        return valorAnterior;
        }
        //vaciar:
        if (entrada.trim() === ""){
        return "";
        }
        return entrada;// valor nuevo
    }

    // funcion pura:
export function resolverFecha(entrada: string, valorAnterior: Date | null): Date | null  //Despues de pedirFecha ya esta validado, esto es para editar o convertir a Date.
{
    if (entrada === "")
    { 
        return valorAnterior;
    }      // mantener
    if (entrada.trim() === "")
    {
     return null;      

    }  // vaciar
    const [anio, mes, dia] = entrada.split("-").map(Number);
    return new Date(anio, mes - 1, dia);            // nueva fecha (-1 por que llega a 11 js.
}

//Son dos funciones iguales por que se tiene que marca error si se coloca: number | string.
// funcion pura:
export function mantenerActualizarString(entrada: string , valorAnterior: string): string
{
    if(entrada==="")
    {
    return valorAnterior;    
    }
    else
    {
    return entrada;
    }
}
// funcion pura:
export function mantenerActualizarEntero(entrada: string, valorAnterior: number): number| string
{
    if(entrada==="")
    {
    return valorAnterior;    
    }
    else
    {
    return entrada;
    }
}
//funcion pura:
export function validacionFecha(fechaCreacionus: string, ultimaEdicionus:string, fecha:Date): {fechaCreacion: Date| null, ultimaEdicion: Date| null}
{
let ultimaEdicion,fechaCreacion;
        if(fechaCreacionus === "S")
        { 
         fechaCreacion =fecha;

        } 
        else
        {
            fechaCreacion=null;
        }
        if(ultimaEdicionus === "S")
        { 
           ultimaEdicion =fecha;

        } 
        else
        {
            ultimaEdicion=null;
        }
    return{fechaCreacion,ultimaEdicion}

}
// funcion pura:
export function filtrarTareas(opcion:number | null,listaDeTareas:Tarea[],estadoCondicion:string | null,tituloBuscar:string | null):Tarea[]
{
const tareasaFiltrar: Tarea[] =listaDeTareas;
            if(tituloBuscar!==null) //Si estamos buscando entonces en la variable buscar se tiene el titulo de la tarea a buscar.
            {
              if(tituloBuscar.trim() !== "")
                {
                    //devolvemos solo la lista de tareas filtradas.
                    return filtrarporTitulo(tituloBuscar,tareasaFiltrar)
                }
            } 
            else 
            {
                // Si no estamso buscando y estamos viendo todas las tareas ya sea todas(null),Pendiente,En curso, Finalizadas:
            if(estadoCondicion!==null )
             if(opcion===1)
             {
             return filtrarporEstado(estadoCondicion,tareasaFiltrar);
             } 
             else
             {
             return opcion===2? filtrarporDescripcion(estadoCondicion,tareasaFiltrar): filtrarporDificultad(Number(estadoCondicion),tareasaFiltrar);
             }
             
            }
        return listaDeTareas;
         
}    

function filtrarporTitulo(buscar:string,listaDeTareas:Tarea[]):Tarea[]
{
return listaDeTareas.filter((tarea) => tarea.coincideTitulo(buscar));
}

function filtrarporEstado(condicion:string,listaDeTareas:Tarea[]):Tarea[]
{
return listaDeTareas.filter((tarea) => tarea.coincideEstado(condicion));
}

function filtrarporDescripcion(condicion:string,listaDeTareas:Tarea[]): Tarea[]
{
return listaDeTareas.filter((tarea)=> tarea.coincideDescripcion(condicion));
}
function filtrarporDificultad(condicion:number,listaDeTareas:Tarea[]): Tarea[]
{
return listaDeTareas.filter((tarea)=> tarea.coincideDificultad(condicion));
}