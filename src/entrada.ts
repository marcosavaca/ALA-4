import type { Interface } from "node:readline/promises";

type Resultado<T> = { ok: true, valor: T } | { ok: false, error: string };
//Funcion inpura:
export async function pedir<T>(rl: Interface, mensaje: string, validar: (entrada:string) => Resultado<T>): Promise<T>
{
  
        const entrada = await rl.question(mensaje);
        const resultado=validar(entrada);
        if (resultado.ok)
        {
            return resultado.valor;
        }
        else
        {
            console.log(resultado.error);
            //llamada recursion sin while
            return pedir(rl, mensaje, validar);
        }
}
// funcion pura:
export function validarDato(entrada: string, opcionesValidas: string[] | null, obligatorio: boolean): Resultado<string>
{
    if (opcionesValidas)
    {
        const minus = entrada.toLocaleUpperCase();
        if (opcionesValidas.includes(minus))
        {
            return { ok: true, valor: minus };
        }
        else
        {
            return { ok: false, error: `Opcion no valida. Ingresa: ${opcionesValidas.join(", ")}.\n` };
        }
    }
    else
    {
        if (entrada.trim() !== "" || !obligatorio)
        {
            return { ok: true, valor: entrada };
        }
        else
        {
            return { ok: false, error: "Este campo no puede estar vacío.\n" };
        }
    }
}
// funcion pura:
export function validarFecha(entrada: string, editar: boolean, hoy: Date): Resultado<string>
{
    const fechaSinHora=new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
    if (entrada === "")
    {
        return { ok: true, valor: "" };
    }
    if (entrada.trim() === "" && editar)
    {
        return { ok: true, valor: " " };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entrada))
    {
        return { ok: false, error: "Formato no válido. Usa el formato AAAA-MM-DD o presiona Enter para omitir.\n" };
    }

    const [anio, mes, dia] = entrada.split("-").map(Number);
    const fecha = new Date(anio, mes - 1, dia);

    if (fecha.getFullYear() !== anio || fecha.getMonth() !== mes - 1 || fecha.getDate() !== dia)
    {
        return { ok: false, error: "Mes y/o día no válidos\n" };
    }
    if (fecha < fechaSinHora)
    {
        return { ok: false, error: "La fecha debe ser mayor o igual a la de hoy.\n" };
    }
    else
    {
        return { ok: true, valor: entrada };
    }
}

//funcion pura:
export function validarNumero(entrada: string, min: number | undefined, max: number | undefined): Resultado<number>
{
    const texto = entrada.trim();
    const numero = Number(texto);

    if (min === undefined || max === undefined)
    {
        if (texto === "" || isNaN(numero))
        {
            return { ok: false, error: "Ingrese un numero valido.\n" };
        }
        else
        {
            return { ok: true, valor: numero };
        }
    }
    else
    {
        if (texto !== "" && !isNaN(numero) && numero >= min && numero <= max)
        {
            return { ok: true, valor: numero };
        }
        else
        {
            return { ok: false, error: `Ingrese un numero entre ${min} y ${max}.\n` };
        }
    }
}

