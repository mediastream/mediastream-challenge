'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- How it's used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

function properRequester(method, base, headers = { Accept: '*/*' }) {
  return (path = [], body = {}) => fetch((base ? [base, ...path] : path).join('/'), { method, headers, body: JSON.stringify(body) })
    .then(r => r.json());
}

var githubGetter = requester('GET', 'https://api.github.com', {Accept: 'application/json'});
var reqresPoster = requester('POST', 'https://reqres.in/api', {Accept: 'application/json'});
var properReqresPoster = properRequester('POST', 'https://reqres.in/api', {Accept: 'application/json', 'Content-Type': 'application/json'});

var baseMediaStreamPath = ['users', 'mediastream'];

githubGetter(baseMediaStreamPath).then((response) => {
    console.log(response);
    return githubGetter(baseMediaStreamPath.concat(['repos']));
}).then((repos) => {
    console.log('Mediastream repos:');
    repos.forEach((repo) => {
        console.log(repo.name);
    });
    console.log('--------');
}).then(() => {
    reqresPoster(['login']).then((response) => {
        console.log('Should be an error:');
        console.log(response);
        return properReqresPoster(['login'], {'email': 'peter@klaven', 'password': 'cityslicka'});
    }).then((response) => {
        console.log('Should be correct and contain a token:');
        console.log(response);
    });
});
