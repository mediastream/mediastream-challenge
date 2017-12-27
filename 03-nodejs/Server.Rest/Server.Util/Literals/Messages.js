module.exports = {
	Service: {
		Starting: "[SERVICE][STARTING]: ",
		Started: "[SERVICE][STARTED]: ",
		Loading: "[SERVICE][LOADING]: ",
		Loaded: "[SERVICE][LOADED]: ",
		Info: "[SERVICE][INFO]: ",
		MongoDB: "[SERVICE][MONGODB]: "
	},
	Request: {
		OK: "[SERVICE][REQUEST][OK]: ",
		Error: "[SERVICE][REQUEST][ERROR]: "
	},
	Response: {
		OK: "[SERVICE][RESPONSE][OK]: ",
		Error: "[SERVICE][RESPONSE][ERROR]: "
	},
	Strings: {
		ErrorConexionBBDDMongo: "Ha ocurrido un error al tratar de conectarse a la Base de Datos MongoDB. ",
		ErrorObtenerDatos: "Ha ocurrido un error al tratar de obtener los datos. ",
		ErrorIngresarDatos: "Ha ocurrido un error al tratar de ingresar los datos. ",
		ErrorModificarDatos: "Ha ocurrido un error al tratar de modificar los datos. ",
		ErrorEliminarDatos: "Ha ocurrido un error al tratar de eliminar los datos. ",
		ErrorInesperado: "Ha ocurrido un error inesperado. ",
		ErrorEjecucionOperacion: "Ha ocurrido un error al ejecutar la operación. ",
		ErrorParametrosEntrada: "Error en los parámetros de entrada de la operación (parámetros de entrada no válidos o no definidos). "
	}
};
