const datetime = require("date-and-time");

const responseDTO = require("../GestionUsuarios.DTO/Response/responseDTO");
const preRespDTO = require("../GestionUsuarios.DTO/Response/preResponseDTO");

const userModel = require("../GestionUsuarios.Model/UserModel");

exports.OBTENER_USUARIOS = OBTENER_USUARIOS;

function OBTENER_USUARIOS(callback, App_Config, Service_Params, Util_Messages, request_method){
	console.log("[D.A.L.][UsuariosDAO.js][OPERATION]: CONSULTAR_USUARIOS");
	let JSONResponse;
	let Resultado;

	let strResultado;

	userModel.find(function(err, usuarios) {
		if (!err) {
			// console.log('usuarios:');
			// console.log(usuarios);
			callback(null, usuarios);
		} else {
			let j = preRespDTO;
			j.CodigoHTTP = 400;
			j.MensajeInterno = App_Config.ValidationProperties.ERROR;
			j.MensajeServicio = Util_Messages.Strings.ErrorConexionBBDDOracle + " (ERROR: " + err.message + ")";

			JSONResponse = GENERA_RESPONSE_ERROR(j.CodigoHTTP, request_method, Operacion, j.MensajeInterno, j.MensajeServicio);

			callback(JSONResponse, null);
		}
	});
	return strResultado;
};

function GENERA_RESPONSE_ERROR(CodigoHTTP, request_method, Operacion, MensajeInterno, MensajeServicio) {
	let r = responseDTO;
	console.log("[SERVICE][ERROR]: [GENERANDO RESPONSE]");
	let fechaHoy = new Date();
	let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');

	r.Response.Header.NombreOperacion = Operacion;
	r.Response.Info.FechaHora = fechaHoy_formatted;
	r.Response.Info.RequestMethod = request_method;
	r.Response.Data.BodyData = {};

	r.Response.Resultado.Codigo = 1
	r.Response.Resultado.OrigenMensaje = "[SERVICIO]"
	r.Response.Resultado.CodigoHTTP = CodigoHTTP;
	r.Response.Resultado.MensajeInterno = MensajeInterno;
	r.Response.Resultado.MensajeServicio = MensajeServicio;

	return JSON.stringify(r);
};
