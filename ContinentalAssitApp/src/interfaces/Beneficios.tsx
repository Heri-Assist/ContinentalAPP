// Generated by https://quicktype.io

export interface BeneficiosRespuesta {
	resultado:        Beneficios[];
	cantidad:         number;
	error:            boolean;
	tipos_beneficios: TiposBeneficio[];
}

export interface Beneficios {
	id_beneficio:      string;
	nombre:            string;
	valor:             string;
	id_tipo_beneficio: string;
	descripcion:       string;
}

export interface TiposBeneficio {
	id:                    string;
	id_tipo_beneficio:     string;
	nombre_tipo_beneficio: string;
	icono_tipo_beneficio:  string;
	lenguaje:              string;
}
