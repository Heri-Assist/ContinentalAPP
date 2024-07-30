import { id } from 'date-fns/locale';
// Generated by https://quicktype.io


export interface UsuarioRegistro {
    ps: string;
        id?: number;
    nombre?:   string;
    email?:    string;
    nacimiento?: Date ;
    telefono?: string;
    id_usuario?: number;
    idEmision?: number;
    codigo?: string;
    fecha?: string;
    pais_callingCode?:string;
    pais_name?:string,
    pais_flag?:string,
    idioma?:string,
    codigo_voucher?:string,
    limite_beneficios?:number,
}


export interface ErrorUsuario {
    mensaje_error: string;
}

export interface CodigoRegistro {
    idUsuario: string;
}

export interface usuarioRegistro {
    resultado:  [] | ErrorUsuario[];
    cantidad:  number;
    error:     boolean;
}

export interface Usuario {
    id:              number;
    id_emision:      null;
    codigo:          string;
    fecha:           string;
    nombre_contacto: string;
    salida:          string;
    retorno:         string;
    origen:          string;
    destino:         string;
    plan:            string;
    categoria:       string;
    cantidad:        string;
    beneficiarios:   Beneficiario[];
}

export interface Beneficiario {
    id:                  number;
    nombre:              string;
    apellido:            string;
    email:               string;
    telefono:            string;
    nacimiento:          string;
    edad:                string;
    documento:           string;
    voucherBeneficiario: string;
}
