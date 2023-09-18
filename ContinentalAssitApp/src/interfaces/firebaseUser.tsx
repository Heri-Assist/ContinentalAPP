
export interface UserFirebase {
  nombre: string;
  ipLatitude: string;
  ipLongitude: string;
  email: string;
  language: string;
}

export interface MessageChat {
  id: string;
  text: string;
  isSent: boolean;
  timestamp: number;
}