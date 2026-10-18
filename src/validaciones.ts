import type { Tarea } from "./tipos.ts";

// funcion pura
export function control(listaDeTareas: Tarea[]): boolean {
    if (listaDeTareas.length === 0) 
    {
        
        return true;
    }
    return false;
}
//funcion pura
export function esvacio(valor: string| Date | null): boolean
    {
        if(valor===null || valor===undefined)
        {
         return true;
        }
        if (valor instanceof Date)  //un fecha no se deja vacia y por default se poone la fecha de creacion.
        {  
            return false
        }
        if(typeof valor === "string")
        {
            return valor.trim() === "";  // si es un string y espacio en blanco entonces es vacio.
        }
        // si no cumple que sea nulo o stirng y espacio en blanco entonces es falso.
        return false;
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