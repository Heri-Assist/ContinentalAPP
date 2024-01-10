
export interface UserFirebase {
  nombre: string;
  ipLatitude: string;
  ipLongitude: string;
  email: string;
  language: string; 
}

export interface MessageChat {
  de: string;
  fecha: object | { seconds: number; nanoseconds: number } | number;
  mensaje: string;
  tipo:string;
  nombreArchivo: string;
  isSent?: boolean,
}