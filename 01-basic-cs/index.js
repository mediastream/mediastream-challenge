'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

let databaseHats = _.flatMap(database, 'hats')

function logTotalSumThreeMostSellingHats(numHats = 3) {
    let hats = {};

    _.forEach(databaseHats, hat => {
        hats[hat.name] = !hats[hat.name] ? 1 : hats[hat.name] += 1;
    })

    return _.reduce(
        _.map(
            _.slice(
                _.orderBy(
                    _.sortBy(
                        _.map(
                            _.keys(
                                hats,
                                (key) => key)
                            , hat => ({ name: hat, sold: hats[hat] }))
                        , 'sold'),
                    'sold', 'desc'), 0, numHats),
            hat => hat.sold),
        (prev, curr) => prev + curr)
}

const total = logTotalSumThreeMostSellingHats() 

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
