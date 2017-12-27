const async = require("async");
const _ = require('lodash');
const json2csv = require('json2csv');

const datetime = require("date-and-time");
//DEPENDENCIA: DAL
const usuariosDAO = require("../GestionUsuarios.DAL/UsuariosDAO");
//DEPENDENCIA: DTO
const responseDTO = require("../GestionUsuarios.DTO/Response/responseDTO");
const preRespDTO = require("../GestionUsuarios.DTO/Response/preResponseDTO");

exports.obtenerUsuarios = obtenerUsuarios;

function obtenerUsuarios(response, App_Config, Service_Params, Util_Messages, request_method, requestBody){
	console.log("[B.L.L.][UsuariosBO.js][DATA]: " + requestBody);
	let strResultado;

		let data = {};

						async.waterfall([
							function(callback) {

									console.log("ASYNC [SERIE] 1: Ejecutando Consulta: OBTENER_USUARIOS");

									strResultado = usuariosDAO.OBTENER_USUARIOS(callback,
													App_Config, Service_Params, Util_Messages, request_method);

							}
						],
						function(err, results) {
							if(err){
								let errorJSON = JSON.parse(err);
								console.log("Async ERROR: " + errorJSON.Response.Resultado.MensajeServicio);

								response.writeHead(errorJSON.Response.Resultado.CodigoHTTP, {'Content-Type': 'application/json; charset=utf-8'});
								response.write(err);
								response.end();
							} else {

								var columnas = ['_id', 'name', 'email'];
								var csv = json2csv({ data: results, fields: columnas });

								//let JSONResponse = GENERA_RESPONSE_OK(request_method, "obtenerUsuarios", results, App_Config.ValidationProperties.EXITO);

								response.attachment('database.csv');
								response.status(200).send(csv);
								//response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
								//response.write(JSONResponse);
								//response.end();
							}
						});

		if (strResultado != App_Config.ValidationProperties.ERROR) {
			console.log("[B.L.L.][UsuariosBO.js]: " + strResultado);
		} else {
			strResultado = App_Config.ValidationProperties.ERROR;
			console.log("[B.L.L.][UsuariosBO.js]: " + strResultado);
		}

	return strResultado;
};

function GENERA_RESPONSE_OK(request_method, Operacion, data_JSON, mensajeServicio) {
	let r = responseDTO;
	console.log("[.DAL][OK]: [GENERANDO RESPONSE]");
	let fechaHoy = new Date();
	let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');

	r.Response.Header.NombreOperacion = Operacion;
	r.Response.Info.FechaHora = fechaHoy_formatted;
	r.Response.Info.RequestMethod = request_method;
	r.Response.Data.BodyData = data_JSON;

	r.Response.Resultado.Codigo = 0
	r.Response.Resultado.OrigenMensaje = "[SERVICIO]"
	r.Response.Resultado.CodigoHTTP = 200;
	r.Response.Resultado.MensajeInterno = mensajeServicio;
	r.Response.Resultado.MensajeServicio = "La operacion se ha ejecutado exitosamente.";

	return JSON.stringify(r);
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
