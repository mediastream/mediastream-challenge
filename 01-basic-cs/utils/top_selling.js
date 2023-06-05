const _ = require('lodash')
const dbUsers = require('../database.json');

module.exports = {
  topSelling: () => {

    dbHats = dbUsers.map(user => user.hats);

    // obtengo un array plano de los sombreros
    const allHats = _.flatten(dbHats);

    // obtengo la cantidad de ocurrencias de cada sombrero en el array total
    const countHats = _.countBy(allHats, 'id')

    // los ordeno
    const sorted = _.orderBy(countHats)

    // obtengo los 3 mas vendidos
    const top3selling = sorted.slice(-3).reduce((a, b) => a + b, 0);

    return top3selling
  }
}
