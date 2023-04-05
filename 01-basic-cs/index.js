'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hatsid = _.countBy(database.flatMap(item => item.hats), 'id')
const SortedHats = Object.entries(hatsid)
  .sort(([, valorA], [, valorB]) => valorB - valorA)
  .reduce((obj, [clave, valor]) => ({ ...obj, [clave]: valor }), {})

const values = Object.values(SortedHats).slice(0, 3)
const total = values.reduce((acc, curr) => acc + curr, 0)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: en este caso representa el peor escenario de numeros de operaciones que un algoritmo realizara, esto seria ignorando
 * ordenes de baja prioridad y solo centrado en la tarea, por ejemplo O(n^2) esto significa que el numero de opraciones crece al cuadrado
 * del tamaño de ingreso
 *  - space complexity: en este caso representa el peor escenario en terminos de memoria que un algoritmo usa en referencia al ingreso
 * por ejemplo O(n) esto significa que la cantidad de memoria sube linealmente con el ingreso de datos
 */
