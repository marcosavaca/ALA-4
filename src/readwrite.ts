import fs from 'fs/promises';
import { Tarea } from "./tipos.ts";
import {parsearTarea} from "./validaciones.ts";
// funcion pura:
export async function CargarTareas():Promise<Tarea[]>
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
// funcion pura:
export async function escribirArchivo(listaDeTareas:Tarea[]):Promise<void> 
{
    const contenido = JSON.stringify(listaDeTareas, null, 2);
    try 
    {
        await fs.writeFile('./archivos/tasks.json', contenido,"utf-8");
       
    } catch (error) 
    {
     
    }
}
