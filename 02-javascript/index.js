'use strict';



// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

/*
function requester(method, base, headers = { Accept: '' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
*/


require('isomorphic-fetch');

fetch('//api.github.com/users/mediastream')
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function(stories) {
		console.log(stories);
	});


/*
1. La función retorna los datos de consumir una API  por ejemplo //api.github.com/users/mediastream

{
  "login": "mediastream",
  "id": 2235288,
  "avatar_url": "https://avatars0.githubusercontent.com/u/2235288?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/mediastream",
  "html_url": "https://github.com/mediastream",
  "followers_url": "https://api.github.com/users/mediastream/followers",
  "following_url": "https://api.github.com/users/mediastream/following{/other_user}",
  "gists_url": "https://api.github.com/users/mediastream/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/mediastream/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/mediastream/subscriptions",
  "organizations_url": "https://api.github.com/users/mediastream/orgs",
  "repos_url": "https://api.github.com/users/mediastream/repos",
  "events_url": "https://api.github.com/users/mediastream/events{/privacy}",
  "received_events_url": "https://api.github.com/users/mediastream/received_events",
  "type": "Organization",
  "site_admin": false,
  "name": "Mediastream",
  "company": null,
  "blog": "http://mediastre.am/",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "public_repos": 9,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "2012-08-28T15:26:47Z",
  "updated_at": "2017-03-26T09:58:55Z"
}

2. Se usa como funcion middleware, la cual nos permite tener acceso al objeto request y 
   al objeto respuesta,

   Esto nos permite por ejemplo 
   Realizar cambios en la solicitud y los objetos de respuesta.

3. Este patrón de diseño es llamado VIEW HELPER, el cual permite realizar cambios en los
   datos desplegados en la vista, sin modificar nuestras reglas de negocio

*/


