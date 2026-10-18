import fs from 'fs/promises';
import { Tarea } from "./tipos.ts";
// funcion pura:
export async function CargarTareas():Promise<Tarea[]>
{
    try 
    {
        
        const contenido = await fs.readFile('./archivos/tasks.json', 'utf-8'); // archivos vive dentro del repo, al lado de src
        const tareasplanas=JSON.parse(contenido);

        const listaTemporal: Tarea[]=[];
        let condicion;
        for (const item of tareasplanas)
        {
                if(typeof item.titulo!=="string" || item.titulo.trim()==="" || typeof item.dificultad!=="number" )
                {

                }
                const tareaInstancia=new Tarea(
                    item.titulo,
                    typeof item.descripcion=== "string"? item.descripcion:null,
                    typeof item.estado ==="string" ? item.estado: null,
                    item.fechaCreacion ? new Date(item.fechaCreacion) : null,
                    item.ultimaEdicionFinal ? new Date(item.ultimaEdicionFinal) : null,
                    item.fechaVencimiento ? new Date(item.fechaVencimiento) : null,
                    item.dificultad    
                );    
                if(condicion)
                {
                    continue;
                }
                listaTemporal.push(tareaInstancia);
            
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
