function serverStart(){

	//https://github.com/nomiddlename/log4js-node
	const log4js = require('log4js');
	log4js.loadAppender('file');
	log4js.addAppender(log4js.appenders.file('logs/Rest.Server.log'), 'RestServer');
	const logger = log4js.getLogger('RestServer');

	//DEPENDENCIA: Util
	const utilServerLog = require("./Server.Util/Literals.Log/serverConsoleLog");

	logger.info("*****************************************************");
	logger.info(utilServerLog.ServerLog.Starting + "API RESTfull - LoginCobranzas: ...");

	logger.info(utilServerLog.ServerLog.Loading + "SERVER PARAMETERS: ...");
	const Server_Params = require("./package.json");
	const Server_Config = require("./appconfig.json");
	logger.info(utilServerLog.ServerLog.Loaded + "SERVER PARAMETERS: OK");

	const datetime = require("date-and-time");
	const express = require("express");
	const bodyParser = require('body-parser');
	const mongoose = require("mongoose");
	const cors = require('cors');
	const helmet = require('helmet');
	const url = require("url");
	//const querystring = require("querystring");
	//const util = require("util");
	const http = require('http');
	const fs = require("fs");

	const path = require('path');

	//DEPENDENCIAS EXTERNAS: Servicios
	const servicioGestionUsuarios = require("./Server.Services/Servicio.GestionUsuarios/Servicio.GestionUsuarios");

	//DEPENDENCIA: DTO's
	const responseDTO = require("./Server.DTO/Response/responseDTO");
	const preRespDTO = require("./Server.DTO/Response/preResponseDTO");
	const publicOperationsDTO = require("./Server.DTO/Operations/publicOperationsDTO");

	const maxData = 4 * 1024 * 1024;

	logger.info(utilServerLog.ServerLog.Starting + "Servidor - Mediastream Challenge: ...");

				// Configuramos Express
				const Server = express();
				//Server.use(bodyParser.urlencoded({extended: true}));
				Server.use(bodyParser.urlencoded({
					parameterLimit: 1, //100000,
					limit: '100mb',
					extended: true
				}));
				Server.use(bodyParser.json());
				Server.use(cors());
				Server.use(helmet());
				Server.set('IP', Server_Config.Server.IP);
				Server.set('PORT', Server_Config.Server.Port);

				// Iniciamos las rutas de nuestro servidor/API
				const router = express.Router();

				//RUTAS PÚBLICAS

				//Registrar Usuario
				router.get(publicOperationsDTO.Operaciones.ServicioGestionUsuarios.getUsers, function(request, response){
					let JSONResponse;
					try {
						logger.info("-----------------------------------------------------");
						logger.info("[SERVER][INICIANDO INVOCACION PUBLICA...]");
						const fechaHoy = new Date();
						let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');
						logger.info("[START DATE]: " + fechaHoy_formatted);
						logger.info("[REQUEST METHOD]: " + request.method + "");

						let ServicioGestionUsuarios = new servicioGestionUsuarios(response);
						JSONResponse = ServicioGestionUsuarios.obtenerUsuarios(request.method, request.body);

					} catch (ex) {
						//ERROR: GENERAL
						let j = preRespDTO;
						j.CodigoHTTP = 500;
						j.MensajeInterno = "ERROR";
						j.MensajeServicio = "El servidor no puede y no procesará la solicitud debido a un error grave (ERROR: " + ex.toString() + ")";

						JSONResponse = GENERA_RESPONSE_ERROR(response, j.CodigoHTTP, j.MensajeInterno, j.MensajeServicio);

						response.writeHead(j.CodigoHTTP, {'Content-Type': 'application/json; charset=utf-8'});
						response.write(JSONResponse);
						response.end();

						logger.fatal("ERROR: " + ex.toString());
					}
				});
				// FIN: RUTAS PÚBLICAS

				Server.use(router);

				http.createServer(Server).listen(Server.get('PORT'), function() {
				  logger.info(utilServerLog.ServerLog.Info + "Servidor HTTP: NodeJS - Rest MediaStream-Challenge [v" + Server_Params.version + "]: ...");
				  logger.info(utilServerLog.ServerLog.Started + "*** OK ***");
				  logger.info(utilServerLog.ServerLog.Info + "API RESTfull is running and listening at http://%s:%s", Server.get('IP'), Server.get('PORT'));
				  logger.info("*****************************************************");
				});

	function GENERA_RESPONSE_ERROR(response, CodigoHTTP, MensajeInterno, MensajeServicio){
		let r = responseDTO;
		logger.info(utilServerLog.ResponseLog.Error + "GENERANDO RESPONSE ...");
		let fechaHoy = new Date();
		let fechaHoy_formatted = datetime.format(fechaHoy, 'DD/MM/YYYY - HH:mm:ss');

		r.Response.Info.FechaHora = fechaHoy_formatted;

		r.Response.Resultado.Codigo = 1
		r.Response.Resultado.OrigenMensaje = "[SERVIDOR]"
		r.Response.Resultado.CodigoHTTP = CodigoHTTP;
		r.Response.Resultado.MensajeInterno = MensajeInterno;
		r.Response.Resultado.MensajeServicio = MensajeServicio;

		return JSON.stringify(r);
	};

	function getStringConnection_MongoDB(){
		let strConn;
		strConn = Server_Config.MongoDBServer.IP + ":" + Server_Config.MongoDBServer.PORT + "/" + Server_Config.MongoDBServer.BBDD;
		return strConn;
	};
}

exports.start = serverStart;
