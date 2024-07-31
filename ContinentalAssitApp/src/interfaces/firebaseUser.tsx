import { id } from 'date-fns/locale';

export interface UserFirebase {
  nombre: string;
  ipLatitude: string;
  ipLongitude: string;
  email: string;
  language: string; 
}

export interface MessageChat {
  id?: number;
  de?: string;
  fecha?: object | { seconds: number; nanoseconds: number } | number;
  mensaje?: string;
  tipo?:string | null;
  nombreArchivo?: string;
  isSent?: boolean,
}

export interface MensajeRespuesta {
  id?: number;
  de: string;
  fecha: number;
  mensaje: string;
  tipo: string;
  usuario_sia: number;

}