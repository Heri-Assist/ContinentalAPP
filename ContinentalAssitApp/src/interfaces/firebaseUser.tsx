
export interface UserFirebase {
  nombre: string;
  ipLatitude: string;
  ipLongitude: string;
  email: string;
  language: string;
}

export interface Message {
  id: string;
  text: string;
  isSent: boolean;
  timestamp: number;
}