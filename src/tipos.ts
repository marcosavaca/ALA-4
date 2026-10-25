import {esVacio} from "./validaciones.ts";

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
    coincideDescripcion(buscar:string):boolean
    {
        if(this.descripcion!=null)
        {
        return this.descripcion.toLowerCase().includes(buscar.toLowerCase());  
        }
        else
        {
        return false;
        }
    }
    coincideDificultad(dificultad:number):boolean
    {
        return this.dificultad === dificultad;
    }
    //funciion no pura:
    mostrarDetalle():void
    {
        console.log("Esta es la tarea que elegiste: \n");
        console.log(`Titulo: ${this.titulo} \n`);
        console.log(`Dificultad: ${this.dificultad} \n`);
        console.log(esVacio(this.descripcion,"Descripcion"));
        console.log(esVacio(this.fechaCreacion,"Fecha de creacion"));
        console.log(esVacio(this.ultimaEdicion,"Ultima edicion"));
        console.log(esVacio(this.fechaVencimiento,"Fecha de vencimiento"));

    }
}
