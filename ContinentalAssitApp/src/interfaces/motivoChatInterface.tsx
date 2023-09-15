
// interface para el motivo del chat
export interface MotivoChat {
    resultado: ChatMotivo[];
    cantidad:  number;
    error:     boolean;
}

export interface ChatMotivo {
    id_motivo_chat:       string;
    nombre_motivo:        string;
    nombre_motivo_ingles: string;
}
