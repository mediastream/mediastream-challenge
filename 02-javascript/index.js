'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

1) What it does?
2) How it's used? Add different use-case examples that covers every functionality.
3) How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

const requester = (method, base, headers = { Accept: '*/*' } ) => 
  (path = []) =>
    fetch((base ? [base, ...path] : path).join('/'), { method, headers }).then(r => r.json());

const base = 'https://api.github.com/users/mediastream'
const methods = { GET: 'GET', DELETE: 'DELETE' }
const token = "eyxXSADJSAIDJSADIOJASOIXJI"
const deletableOrgId = 1

console.log(`
  1) Function that return another function whose value is the fetch promise response (resolved or rejected) and we need to pass params for usage
  3) Technique: High Order Function
`)
async function main() {
  const getGistsResponse = await requester(methods.GET, base)(['gists'])
  console.log(`Get gists response: count of gists => ${getGistsResponse.length}`)

  const deleteOrgResponse = await requester(methods.DELETE, base, {
    Authorization: token
  })([`orgs/${deletableOrgId}`])
  console.log('Delete org response: ')
  console.log(deleteOrgResponse)
}

main()