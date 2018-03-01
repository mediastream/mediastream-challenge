'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
R:/ Is a nested function
- How it's used? Add different use-case examples that covers every functionality.
R:/ The nested function provide a scope, that only can access to function into parent with an object of parent
- How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream
`);

let separator = '-----------------';
// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

let req =  requester('GET', 'https://api.github.com/users/mediastream');

//obtain all urls without pass any path
// req().then(res => console.log(res));

//obtain followers
req(['followers']).then(res => {
    console.log(separator);
  res.length > 0 ? console.log('Number of followers: ' + res.length): console.log('You not have any follower yet');
});

//obtain repos
req(['repos']).then(res => {
    console.log(separator);
    res.length > 0 ? console.log('Number of repositories: ' + res.length): console.log('You not have any repositories yet');
});

//check if mediastream is follow me in github
//That can be improve if requester nested function return complete object instead of only the body to use statusCode
req(['following', 'carlososiel']).then(res => {
  if(res.message == 'Not Found') {
    console.log('You not follow me yet.');
  }
  else {
    console.log('Thanks for follow me.')
  }
});