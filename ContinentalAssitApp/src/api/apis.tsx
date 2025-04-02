//Apis para la aplicación
import axios from 'axios';


export const consultaGenral = async () => {
  const baseURL = 'https://continentalassist.co/backmin/restapp';
}


const API_URL = 'https://continentalassist.co/backmin/restapp/app_registro_usuario';

export const consultarRegistro = async (datosUsuario:{}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'EVA-AUTH-USER': 'eyJpdiI6Ik1tTTh3My9NMFdTUUtROGNMb3ZXTHc9PSIsInZhbHVlIjoiVmlySXEwOElhQ0hYS1I3eE1QdGFGM0t5Ulh0SHhub3ljUFVlczA1bWVIUT0iLCJtYWMiOiI2YTZkMzBmMjlmOTA4NGE1ZDc0ZWZmNTgyZDI4MTgxM2UzMTMxODQwMWMwNTNmZWQwNTk2ZjMzODhkMDc3YzY5IiwidGFnIjoiIn0=',
    };

    const response = await axios.post(API_URL, datosUsuario, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// api para obtener los motivos de la consulta del chat
export const apiConsultaMotivosChat = async () => {
  const baseURL = 'https://continentalassist.co/backmin/restapp/app_consulta_motivos_chat';

  try {
    const response = await axios.post(baseURL, { ps: 'www.continentalassist.com' });
    return response.data.resultado;
  } catch (error) {
    return [];
  }
};


// api para Validar los chat
export const ApiValidarVigenciaVoucher = async (codigoVoucher: string) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_validar_vigencia_voucher';
    const authToken = 'eyJpdiI6Ik1tTTh3My9NMFdTUUtROGNMb3ZXTHc9PSIsInZhbHVlIjoiVmlySXEwOElhQ0hYS1I3eE1QdGFGM0t5Ulh0SHhub3ljUFVlczA1bWVIUT0iLCJtYWMiOiI2YTZkMzBmMjlmOTA4NGE1ZDc0ZWZmNTgyZDI4MTgxM2UzMTMxODQwMWMwNTNmZWQwNTk2ZjMzODhkMDc3YzY5IiwidGFnIjoiIn0=';

    const headers = {
      'Content-Type': 'application/json',
      'EVA-AUTH-USER': authToken,
    };

    const data = {
      ps: 'www.continentalassist.com',
      codigoVoucher: codigoVoucher,
    };

    try {
      const response = await axios.post(baseURL, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al validar vigencia del voucher:', error);
      return null;
    }
};


// api para Eliminar los telefonos
export const apiEliminarTelefono = async (idTelefono: number) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_eliminar_telefono';
    const authToken = 'eyJpdiI6Ik1tTTh3My9NMFdTUUtROGNMb3ZXTHc9PSIsInZhbHVlIjoiVmlySXEwOElhQ0hYS1I3eE1QdGFGM0t5Ulh0SHhub3ljUFVlczA1bWVIUT0iLCJtYWMiOiI2YTZkMzBmMjlmOTA4NGE1ZDc0ZWZmNTgyZDI4MTgxM2UzMTMxODQwMWMwNTNmZWQwNTk2ZjMzODhkMDc3YzY5IiwidGFnIjoiIn0=';

    const headers = {
        'Content-Type': 'application/json',
        'EVA-AUTH-USER': authToken,
    };

    const data = {
        ps: 'www.continentalassist.com',
        idTelefono: idTelefono,
    };

    try {
        const response = await axios.post(baseURL, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar teléfono:', error);
        return null;
    }
};


// api Para consultar los beneficiarios de los vahuchers
export const apiConsultaBeneficiosVoucher = async (limiteBeneficios: number, idioma: string, codigoVoucher?: string) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_consulta_beneficios_voucher';
    const authToken = 'eyJpdiI6Ik1tTTh3My9NMFdTUUtROGNMb3ZXTHc9PSIsInZhbHVlIjoiVmlySXEwOElhQ0hYS1I3eE1QdGFGM0t5Ulh0SHhub3ljUFVlczA1bWVIUT0iLCJtYWMiOiI2YTZkMzBmMjlmOTA4NGE1ZDc0ZWZmNTgyZDI4MTgxM2UzMTMxODQwMWMwNTNmZWQwNTk2ZjMzODhkMDc3YzY5IiwidGFnIjoiIn0=';

    const headers = {
      'Content-Type': 'application/json',
      'EVA-AUTH-USER': authToken,
    };

    const data = {
      ps: 'www.continentalassist.com',
      codigo_voucher: codigoVoucher || '', // Asignamos un valor por defecto si no se proporciona el código
      limite_beneficios: limiteBeneficios,
      idioma: idioma,
    };

    try {
      const response = await axios.post(baseURL, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al consultar beneficios del voucher:', error);
      return null;
    }
};


// api para consultar los  beneficiarios de asistencias
export const apiBeneficiariosAsistencias = async (voucher?: string) => {
  const baseURL = 'https://asistencia2.continentalassist.com/api/beneficiarios_asistencias';
  // const authorizationHeader = this.state.session.configuracion.intro_authorization;

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': authorizationHeader,
  };

  const data = voucher ? { voucher } : {};

  try {
    const response = await axios.post(baseURL, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al obtener beneficiarios de asistencias:', error);
    return null;
  }
};


// api para consultar los motivos de reembolsos
export const ApiconsultaMotivosReembolsos = async (idioma: string) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_consulta_motivos_reembolsos';

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      ps: 'www.continentalassist.com',
      idioma: idioma,
    };

    try {
      const response = await axios.post(baseURL, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al consultar motivos de reembolsos:', error);
      return null;
    }
  };

//api para consultar Paises
export const consultaPaises = async (idioma: string) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_consulta_paises';

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      ps: 'www.continentalassist.com',
      campos: 'name, es, alpha2Code',
      idioma: idioma,
    };

    try {
      const response = await axios.post(baseURL, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al consultar países:', error);
      return null;
    }
};


// api para enviar reembolso
export const apiEnviarReembolso = async (formData:{}) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_enviar_reembolso';

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    try {
      const response = await axios.post(baseURL, formData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al enviar reembolso:', error);
      return null;
    }
};


// api para enviar notificación de reembolso enviado
export const apiEnviarNotificacionReembolsoEnviado = async (idUsuario:string) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_enviar_notificacion_reembolso_enviado';

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const data = {
        ps: 'www.continentalassist.com',
        idUsuario: idUsuario,
    };

    try {
      const response = await axios.post(baseURL, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al enviar notificación de reembolso enviado:', error);
      return null;
    }
};


// api para consultar las preguntas frecuentes
export const apiConsultaPreguntasFrecuentes = async (idioma: string) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_consulta_preguntas_frecuentes';
    const authToken = 'eyJpdiI6Ik1tTTh3My9NMFdTUUtROGNMb3ZXTHc9PSIsInZhbHVlIjoiVmlySXEwOElhQ0hYS1I3eE1QdGFGM0t5Ulh0SHhub3ljUFVlczA1bWVIUT0iLCJtYWMiOiI2YTZkMzBmMjlmOTA4NGE1ZDc0ZWZmNTgyZDI4MTgxM2UzMTMxODQwMWMwNTNmZWQwNTk2ZjMzODhkMDc3YzY5IiwidGFnIjoiIn0=';

    const headers = {
      'Content-Type': 'application/json',
      'EVA-AUTH-USER': authToken,
    };

    const data = {
      ps: 'www.continentalassist.com',
      idioma: idioma,
    };

    try {
      const response = await axios.post(baseURL, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al consultar preguntas frecuentes:', error);
      return null;
    }
  };


// api Registrar usuario Nuevo
export const apiRegistrarUsuario = async (usuarioData:{}) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_registro_usuario';
    const authToken = 'eyJpdiI6Ik1tTTh3My9NMFdTUUtROGNMb3ZXTHc9PSIsInZhbHVlIjoiVmlySXEwOElhQ0hYS1I3eE1QdGFGM0t5Ulh0SHhub3ljUFVlczA1bWVIUT0iLCJtYWMiOiI2YTZkMzBmMjlmOTA4NGE1ZDc0ZWZmNTgyZDI4MTgxM2UzMTMxODQwMWMwNTNmZWQwNTk2ZjMzODhkMDc3YzY5IiwidGFnIjoiIn0=';

    const headers = {
      'Content-Type': 'application/json',
      'EVA-AUTH-USER': authToken,
    };

    try {
      const response = await axios.post(baseURL, usuarioData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      return null;
    }
  };

  //Api enviar codigo de registro
  export const apiEnviarCodigoRegistro = async (token:string, idUsuario:string) => {
    const baseURL = 'https://continentalassist.co/backmin/restapp/app_enviar_codigo_registro';

    const headers = {
      'Content-Type': 'application/json',
      'EVA-AUTH-USER': token,
    };

    const data = {
      ps: 'www.continentalassist.com',
      id_usuario: idUsuario,
    };

    try {
      const response = await axios.post(baseURL, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al enviar código de registro:', error);
      return null;
    }
  };
