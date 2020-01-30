'use strict';

const data = require('./database');
const _ = require('lodash');

let result = [];

// changing data structure
data.map((user) => {
    user.hats.map(hat => {
        result.push({ id: hat.id })
    })
});

// counting ocurrences of id
result = _(result)
    .groupBy('id')
    .map((items, id) => ({ id, score: items.length }))
    .value()

// sorting array
result = _.orderBy(result, ['hats', function (o) {
    return o.score;
}], ["desc", "desc"]);

console.log(result.slice(0, 3))


