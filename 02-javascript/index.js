'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  It's a function wich receives three params and one with default values,
  internally it calls a fetch function, it resolves using a promise
- How it's used? Add different use-case examples that covers every functionality.
    The most simple example on how it's used is: 
      requester('GET', 'https://restcountries.eu/rest/v2/alpha/ve')().then(data => console.log(data))
    More complex uses are: creating a common api endpoint service (to get countries by alpha code in this case)
    var alphaCountries = requester('GET', 'https://restcountries.eu/rest/v2/alpha')
    then, to call a specific country using it's code we can use
    alphaCountries(['ven']).then(data => console.log(data))
    Or, to use it in a more general way, we can define a service to consume from the base api route
    var countries = requester('GET', 'https://restcountries.eu/rest/v2')
    and then we can consume from different api endpoints:
    To get a country by alpha code: countries(['alpha', 've']).then(data => console.log(data))
    To get a lis of countries by language : countries(['lang', 'es']).then(data => console.log(data))
- How it is called this design pattern or technique?
  Builder Pattern, because it encapsulates the details on how to build an endpoint fetcher
HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

