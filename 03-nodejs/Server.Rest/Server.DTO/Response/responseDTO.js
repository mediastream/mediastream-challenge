const headerDTO = require("../ViewsDTO/HeaderDTO");
const infoDTO = require("../ViewsDTO/InfoDTO");
const returnDTO = require("../ViewsDTO/ReturnDTO");
const resultDTO = require("../ViewsDTO/ResultDTO");

module.exports = {
	Response:{
		Header: headerDTO,
		Info: infoDTO,
		Data: returnDTO,
		Resultado: resultDTO
	}
};
