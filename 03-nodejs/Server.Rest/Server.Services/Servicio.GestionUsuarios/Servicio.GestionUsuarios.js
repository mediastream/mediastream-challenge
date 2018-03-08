const mongoose = require("mongoose");

const service_AppConfigPackage = require("./appconfig.json");
const service_ConfigPackage = require("./package.json");

//DEPENDENCIA: Util
const service_UtilMessages = require("./GestionUsuarios.Util/Literals/Messages");
//DEPENDENCIA: BLL
const usuariosBO = require("./GestionUsuarios.BLL/UsuariosBO");
//DEPENDENCIA: DTO
const responseDTO = require("./GestionUsuarios.DTO/Response/responseDTO");
//DEPENDENCIA: TokenService + authMiddleware

const ServicioGestionUsuarios = function(response){
	this.response = response;
	this.App_Config = service_AppConfigPackage;
	this.Service_Params = service_ConfigPackage;
	this.Util_Messages = service_UtilMessages;
	
	mongoose.connect(getStringConnection_MongoDB(this.App_Config), function(err, res) {
		if (err){
			console.log("Error: conexión a la base de datos MongoDB: " + err);
		} else {
			console.log("Conexión a la Base de Datos: OK");
		}
		console.log("*****************************************************");
	});

};

ServicioGestionUsuarios.prototype.obtenerUsuarios = function(request_method, requestBody) {
	let strResultado;

	try {

		strResultado = usuariosBO.obtenerUsuarios(this.response, this.App_Config, this.Service_Params, this.Util_Messages, request_method, requestBody);

		if (strResultado != this.App_Config.ValidationProperties.ERROR) {
			console.log("[SERVICIO][GESTIONUSUARIOS]: " + strResultado);
		} else {
			throw new Error(this.Util_Messages.Strings.ErrorEjecucionOperacion + strResultado);
		}

	} catch (ex) {
		console.log("[SERVICIO]: ERROR THROWED: " + ex.toString());
		throw new Error(ex.message);
	}
};

function getStringConnection_MongoDB(App_Config){
	let strConn;
	strConn = App_Config.MongoDBServer.IP + ":" + App_Config.MongoDBServer.PORT + "/" + App_Config.MongoDBServer.BBDD;
	return strConn;
};

module.exports = ServicioGestionUsuarios;
