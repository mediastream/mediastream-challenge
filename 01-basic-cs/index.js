'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const TOP_QUANTITY = 3
const total = _.orderBy(
  _.toPairs(
    _.countBy(
      database.map(db => db.hats).flat(),
      'id'
    )
  ),
  [1, 0],
  ['desc', 'asc']
)
  .slice(0, TOP_QUANTITY)
  .reduce((accum, [hatId, hatCount]) => accum + hatCount, 0)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 ****************************************
 *** Explicacion ***
 ****************************************
  Para "database.map(db => db.hats).flat()" => O(n)

  Para "_.countBy(m-length-array)"          => O(m)
  Para "_.toPairs(...)"                     => <La misma anterior>

  Para "_.orderBy(...)"                     => O(m log(m))

  Para ".slice(0, TOP_QUANTITY = 3)"                       => O(3)
  Para ".reduce((accum, [id, count]) => accum + count, 0)" => O(3)

  Complejidad total =>  O(n + m*log(m) + 3)
  Donde
  - n: Tamaño de database
  - m: Tamaño resultante luego del .flat() Serían todos los elementos Hats dentro de database
  - 3: Es el tamaño del top requerido
****************************************
****************************************
 En cuanto al espacio, la maxima cantidad de elementos que resultan de la operacion
 es determinada por la operacion flat() que devolveria todos los elementos hats dentro de database
 Asi que la complejidad de espacio seria:
 - O(m)
 *****************************************/

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n + m*log(m) + 3)
 *   - space complexity: O(m)
 */
