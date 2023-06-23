'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hatsById = _.flatMap(database, 'hats')
const resultHats = _.chain(hatsById)
  .groupBy('id')
  .map((items) => ({ id: items[0].id, count: items.length }))
  .orderBy('count', 'desc')
  .take(3)
  .value()

const sumHatsTopSellers = _.sumBy(resultHats, 'count')

// console.log(_.map(resultHats, 'count'), 'hatsTopSellers')
// console.log(sumHatsTopSellers, 'sumHatsTopSellers')
const total = sumHatsTopSellers

// Throws error on failure
const assertMessage = `Invalid result: ${total} != 23`
assert.equal(total, 23, assertMessage)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n): es debido al uso de orderBy que utiliza algoritmo de clasificacion con complejida temporal. Los metodos groupBy y map tambien tiene complejidad de tiempo.
 *  *   - space complexity: 0(n): es debido hatsById y resultHats son arrays de n elementos. estas matrices aumental linealmente con el tamaño de los datos de entrada.
 */
