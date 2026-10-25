import fs from 'fs/promises';
import { Tarea } from "./tipos.ts";
// funcion pura:
export async function cargarTareas():Promise<Tarea[]>
{
    try 
    {
        
        const contenido = await fs.readFile('./archivos/tasks.json', 'utf-8'); // archivos vive dentro del repo, al lado de src
        const tareasplanas=JSON.parse(contenido);

        const listaTemporal: Tarea[]=[];
    
        for (const item of tareasplanas)
        {
               
                const tareaInstancia=parsearTarea(item);
                if (tareaInstancia !== null) 
                {
                    listaTemporal.push(tareaInstancia);
                }
        }
        return listaTemporal;

    } 
    catch (error) 
    {
        console.error("Error al leer tasks.json:", error);
        return [];
    }
}

//funcion pura:
function parsearTarea(item: any): Tarea | null
{
    // si los campos obligatorios no existen retornamos null, no existe la tarea.
    if (typeof item.titulo !== "string" || item.titulo.trim() === "" || typeof item.dificultad !== "number")
    {
        return null;
    }
    return new Tarea(
        // Comprobamos que los datos opcionales y que tambien se pueden dejar por defecto, esten correctos:
        item.titulo,
        typeof item.descripcion === "string" ? item.descripcion : null,
        typeof item.estado === "string" ? item.estado : null,
        item.fechaCreacion ? new Date(item.fechaCreacion) : null,
        item.ultimaEdicion ? new Date(item.ultimaEdicion) : null,
        item.fechaVencimiento ? new Date(item.fechaVencimiento) : null,
        item.dificultad
    );
}
//funcion pura:
export async function escribirArchivo(listaActualizada: Tarea[]): Promise<{ mensaje: string | null }>
{
    let mensaje: string | null = null;
 const contenido = JSON.stringify(listaActualizada, null, 2);
    try 
    {
     await fs.writeFile('./archivos/tasks.json', contenido,"utf-8");
                        
    } catch (error) 
    {
    mensaje=(`error : ${error} `);
    }   
    return {mensaje};
}