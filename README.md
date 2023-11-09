# Basic Monorepo example
The following explains how to setup a basic monorepo for NodeJS. In this example, we will have ProjectA and ProjectB. ProjectA is a exported component and ProjectB will import the component from ProjectA. Both ProjectA and ProjectB have their own dependencies requirements.

## Project Structure
The monorepo is structured as follows:
```/my-monorepo
│
├── packages
│   ├── ProjectA
│   │   ├── index.js
│   │   └── package.json
│   │
│   └── ProjectB
│       ├── index.js
│       └── package.json
│
└── package.json```

## Setup
###Initialize the monorepo

````bash
mkdir my-monorepo && cd my-monorepo
yarn init -y
````

###Configure Yarn Workspaces in root
In root, create the root `packages.json` :

````json
{
	"name": "my-monorepo",
	"private": true,
	"workspaces":  [
		"packages/*"
	]
}
````

The `"private": true` is important because it prevents the root of your monorepo from being accidentally published to npm.

###Create ProjectA (your component)
Within your monorepo, create a packages directory where each package will live:

````bash
mkdir packages && cd packages
````

Now create ProjectA:

````bash
mkdir ProjectA && cd ProjectA
yarn init -y
````

Within ProjectA, create its own package.json, we will have `lodash` as a dependency for ProjectA:

````json
{
	"name": "@my-monorepo/project-a",
	"version": "1.0.0",
	"main": "index.js",
	"license": "MIT",
	"dependencies":  {
		"lodash": "^4.17.21"
	}
}
````

And the corresponding `index.js` file with a simple export:

````javascript
const _ = require('lodash');

const componentA = () => {
	console.log('This is component A with Lodash version:', _.VERSION);
};

module.exports = componentA;
````

###Create ProjectB (your app)
Create corresponding ProjectB back in the packages folder:

````bash
cd..
mkdir ProjectB && cd ProjectB
yarn init -y
````

Create the `package.json` for ProjectB:

````json
{
	"name": "@my-monorepo/project-b",
	"version": "1.0.0",
	"main": "index.js",
	"license": "MIT",
	"dependencies":  {
		"@my-monorepo/project-a": "1.0.0",
		"axios": "^1.6.1"
	}
}
````

ProjectA is linked here as a dependency as seen above. `Axios` is a dependency used only by ProjectB.

Create `index.js` for projectB that uses the component exported from ProjectA:

````javascript
const componentA = require('@my-monorepo/project-a');
const axios = require('axios');

componentA();

axios.get('https://api.github.com/users/github')
 	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log(error);
	});
````

###Install dependencies
We will install dependencies in the root with the yarn managed root `package.json`.

Yarn will now install all dependencies in the root node_modules, linking projectA within projectB's node_modules.

````bash
cd ../../
yarn
````

## Run
All dependencies are now managed in the root of the Monorepo. You will hence run each of your projects individually from the packages folder.

To run Project B:

````bash
cd packages/ProjectB
node index.js
````

You should see the console.log from the component exported from ProjectA and the output from Axios in ProjectB:

````bash
This is component A with Lodash version: 4.17.21
{
	login: 'github',
	id: 9919,
	....
	created_at: '2008-05-11T04:37:31Z',
	updated_at: '2022-11-29T19:44:55Z'
}
````

