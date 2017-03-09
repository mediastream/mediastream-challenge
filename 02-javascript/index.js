'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
\x1b[36m 
  R: Make a web request using fetch mechanism based on promises 
\x1b[0m 



- How it's used? Add different use-case examples that covers every functionality.


- How it is called this design pattern or technique?
\x1b[36m 
  R: 
  - Fetch uses Promise Pattern 
  - requester uses Returning functions Pattern

\x1b[0m 

HINT: Use https://api.github.com/users/mediastream
`);



// Add fetch polyfill for Node.js
require('es6-promise').polyfill();
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch
const _ = require('lodash');

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}


let _req = requester( 'get', 'https://api.github.com' );

_req( [ 'users', 'mediastream' ] )
  .then( d => {
    console.log( 'Hi, ' + d.login + ' ( ' + d.blog + ' )' );
    console.log( 'you have ' + d.public_repos + ' public repos');
  })
  .then( () => {


    console.log( 'Your public repos: ' );
    // Find repos List ...
    _req( [ 'orgs', 'mediastream', 'repos' ] )
      .then( d => {
        _.forEach(d, function( itm_ ) {
          console.log( '- ' + itm_.name);
        }, this);
        // console.log( d );
      })
      .catch( e => console.log(e))
      

  }) 
  .catch( e => console.log(e))

