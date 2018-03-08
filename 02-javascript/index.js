'use strict';

/**
 * Created by Edgardo Barría Melián - 19/02/2018
 * edgardo.barriam@gmail.com
 */

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
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'),{ method, headers })
    .then(r => r.json());
}

/*
  - What it does?

    This function performs a request to a specific URL and then returns a Json object response.
    It allows to specify a HTTP method, a URL, a path and optional headers for the request, but only the method and base/path arguments are mandatory
    This function manages the url by first asking if there's a 'base' argument specified, and mixes the base url with 
    the path variable using a ES6 feature called spread operator (...). All of this is indise a conditional operator (-- ? -- : --).
    After this, it joins the array result by using join('/')
    The headers argument is optional, and it allows us to set specific options for the request. By default, it allows any kind of content

    As I mentioned the final result is a json object.

  - How it's used? Add different use-case examples that covers every functionality.
*/
    // The most simple way to use it is calling the function with only the method and base arguments:
    requester('GET','https://api.github.com/users/mediastream')().then((response) => console.log(response));

    // You can also divide the base and path arguments
    requester('GET','https://api.github.com')(['users', 'mediastream']).then((response) => console.log(response));

    // Using request headers you can specify what type of content you want to allow...
    requester('GET','https://api.github.com', {Accept: 'application/json'})(['users', 'mediastream']).then((response) => console.log(response));

    // There is a way of using only the path argument
    requester('GET')(['https://api.github.com', 'users', 'mediastream']).then((response) => console.log(response));

    // Using a different http method (this url doesn't have POST support, so it wont return anything useful)
    requester('POST')(['https://api.github.com', 'users', 'mediastream']).then((response) => console.log(response));

/* 
- How it is called this design pattern or technique?
  To be honest I have no idea, i've never seer a design pattern or technique similar to this one.
*/