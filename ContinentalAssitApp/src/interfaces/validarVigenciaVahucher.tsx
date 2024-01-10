// Generated by https://quicktype.io

export interface ValidarVigenciaVahucher {
    resultado: VigenciaVahucher[];
    cantidad:  number;
    error:     boolean;
}

export interface VigenciaVahucher {
    voucher:                            string;
    hoy:                                string;
    salida:                             string;
    retorno:                            string;
    diasViaje:                          number;
    vigenciaDesde:                      string;
    vigenciaHasta:                      string;
    vigenciaHastaMasCinco:              string;
    diasRestantesvigenteParaEmergencia: number;
    vigenteParaEmergencia:              boolean;
    diasRestantesVigenteMasCinco:       number;
    vigenteMasCinco:                    boolean;
    enRiesgo:                           boolean;
    activo:                             boolean;
}
