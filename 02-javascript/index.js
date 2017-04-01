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

console.log(`
  - What it does?
    
      The 'requester' function is a wrapper for the native fetch API, it's useful for  construct 
      a callable function to make HTTP requests given a set of configurations by default.
      
  -  How it's used? Add different use-case examples that covers every functionality.

        The function works as a factory, thus, we can instantiate a 'requester' function 
      passing  the  following params: 
          * method -> an HTTP method in [GET, 'HEAD, 'DELETE'],
          * base -> the url base
          * headers -> an object to config the default headers for the subsequent requests.
      
        In order to use this callable function we can wheter call it directly or instatiate it to a local variable 
      and use it for subsequent requests.

      This object, returns a function  which receives a path parameter as an array and then returns a  promise
      which we can chain or use for nested, parallel or sequential requests.

     - use case #1 - Direct Call: 
     
     requester(
        'GET',
        'https://api.github.com'
      )(['users', 'getch']).then((res) => console.log(res));

    - use case #2 - Instantiate a requester object in order to use it in further calls:

    const API = requester(
      'GET',
      'https://api.github.com'
    );

    Promise.all([
      API(['users', 'ronsuez']),
      API(['users', 'ronsuez', 'followers']),
    ]).then((res) => console.log(res));
  

   - use case #3 - Instantiate several requester objects pointing to different API's:

    const GithubAPI = requester(
      'GET',
      'https://api.github.com'
    );

    const EmailValidatorAPI = requester(
      'GET',
      'https://pozzad-email-validator.p.mashape.com', {
        'X-Mashape-Key': 'YOUR_MASHAPE_KEY',
        'Accept': 'application/json'
      }
    );


    - How it is called this design pattern or technique?

      This technique is called IIFE (immediately-invoked function expression, by Ben Alman), 
      this approach is called self-executing (or self-invoked) anonymous function.


      According to Addy Osmani this is a pattern which:
     
          "IIFE is effectively an unnamed function, 
          immediately invoked after it's been defined...In JavaScript, 
          because both variables and functions explicitly defined 
          within such a context may only be accessed inside of it, 
          function invocation provides an easy means to achieving privacy."

    References:
      * https://addyosmani.com/resources/essentialjsdesignpatterns/book/#designpatternsjavascript
`);

requester(
  'GET',
  'https://api.github.com'
)(['users', 'mediastream']).then((res) => console.log(res.login));


const API = requester(
  'GET',
  'https://api.github.com'
);

const EmailValidatorAPI = requester(
  'GET',
  'https://pozzad-email-validator.p.mashape.com', {
    'X-Mashape-Key': 'YOUR_MASHAPE_KEY',
    'Accept': 'application/json'
  }
);


Promise.all([
  API(['users', 'ronsuez']),
  API(['users', 'mediastream']),
]).then((res) => res.map(user => console.log(`email: ${user.email}`)));


API(['users', 'ronsuez'])
  .then((user) => EmailValidatorAPI(['emailvalidator', 'validateEmail', user.email]))
  .then((check) => console.log(check))
  .catch((err) => console.log(err))