'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

// Contar la cantidad de ventas por cada sombrero
const hatsCount = _.countBy(_.flatMap(database, 'hats'), 'name')

// Obtener los tres sombreros más vendidos
const topHats = _.slice(_.sortBy(hatsCount), -3)

// Sumar la cantidad de ventas de los tres sombreros más vendidos
const totalHats = _.reduce(topHats, (sum, count) => sum + count)

const total = totalHats // TODO

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n), donde 'n' es el número de elementos en el array de sombreros. La función _.sortBy() es la que tiene una complejidad de O(n log n), debido a que utiliza un algoritmo de ordenamiento basado en comparaciones.
 *   - space complexity: O(n), donde 'n' es el número de elementos en el array de sombreros. Esto se debe a que se están creando nuevos arrays para los sombreros y para la suma de ventas de los tres sombreros más vendidos, pero estos no son proporcionales al tamaño de entrada.
 */
