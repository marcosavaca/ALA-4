import {esvacio} from "./validaciones.ts";

export class Tarea
{   
    titulo: string = "";
    descripcion: string | null = null;
    estado: string = "";
    fechaCreacion: Date | null = null;
    ultimaEdicion: Date | null = null;
    fechaVencimiento: Date | null = null;
    dificultad: number = 0;
    // funcion pura:
    constructor(titulo: string,descripcion: string | null,estado: string, fechaCreacion: Date | null, ultimaEdicion: Date | null, fechaVencimiento:Date| null, dificultad: number )
    {
     this.titulo=titulo;
     this.descripcion=descripcion
     this.estado=estado;
     this.fechaCreacion=fechaCreacion;
     this.ultimaEdicion=ultimaEdicion;
     this.fechaVencimiento=fechaVencimiento;
     this.dificultad=dificultad;
    }
    // funcionn pura.
    editar(nuevoTitulo: string,nuevaDescripcion: string | null, nuevoEstado: string,fechaCreacion: Date | null,nuevafechaEdicion: Date | null,  nuevaFechaVencimiento: Date | null, nuevaDificultad: number ): Tarea 
    {
            return new Tarea(
                nuevoTitulo,
                nuevaDescripcion,
                nuevoEstado,
                fechaCreacion,
                nuevafechaEdicion,  
                nuevaFechaVencimiento,
                nuevaDificultad
            );   
    }
    // funcion pura.
    coincideEstado(condicion: string | null): boolean
    {
        return condicion === null || this.estado === condicion;
    }
    // funcion pura.
    coincideTitulo(buscar: string): boolean
    {
        return this.titulo.toLowerCase().includes(buscar.toLowerCase());    
    }
    //funciion no pura:
    mostrarDetalle():void
    {
        console.log("Esta es la tarea que elegiste: \n");
        console.log(`Titulo: ${this.titulo} \n`);
        console.log(`Dificultad: ${this.dificultad} \n`);
        mostrarCampo("Descripcion", this.descripcion);
        console.log(`Estado: ${this.estado} \n`);
        mostrarCampo("Fecha de creacion", this.fechaCreacion);
        mostrarCampo("Ultima edicion", this.ultimaEdicion);
        mostrarCampo("Fecha de vencimiento", this.fechaVencimiento);

    }
}
// funcion no pura.
function mostrarCampo(mensaje: string,valor:string | Date| null )
    {
        if(esvacio(valor))
        {
            console.log(`${mensaje}: Sin datos \n`);
            return;
        }
        else
        {
        console.log(`${mensaje}: ${valor} \n`);  
        }
    }
