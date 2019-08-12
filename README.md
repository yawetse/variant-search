# Variant Search Coding Assignment

## Assignment

Create a web application that allows a user to search for genomic variants by gene name and display the results in a tabular view.

## Installation

1. clone repository
2. run npm install (node 10+), I have a local docker image I will deploy later
3. run node index.js -e development

```bash
$ cd /path/to/working-dir
$ git clone git@github.com:yawetse/variant-search.git 
$ npm install
$ node index.js -e development
```

## Features

The endpoints require Basic Auth (for Postman/CURL base64 encode `client_id:client_secret`) in browser use the `client_id` as the username and `client_secret` as the password

1. Allow the user to enter a gene name to search for variants in that gene. Display the results in a table that shows various attributes associated with each genomic variant.

2. Provide an auto-suggest feature for entering the gene name.
   - go to http://localhost:8786

3. Provide two RESTful endpoints supporting the functionality listed in steps 1 and 2.
   - Auto Suggest RESTful endpoint: `http://localhost:8786/basic_api/v1/search/genes/{SEARCHTERM}?format=json`
   - Gene Variants RESTful endpoint: `http://localhost:8786/basic_api/v1/genes/{GENE}?format=json`

## Implementation

### Server Code
- See: https://github.com/yawetse/variant-search/tree/master/content/container/periodicjs.container.default
- Built using Periodicjs (https://github.com/repetere/periodicjs) - My node equvalent of Django there are modules for OAuth servers and authentication, Caching, Multi-factor authentication, RESTful APIs and etc.
  - Used Extensions:
    - OAuth 2 Server - provide an OAuth endpoint for external integrations 
    - Passport, Passport MFA, Basic Auth, and User Access Control - User authentication, access controls, and 2FA/MFA
    - Restful API - configurable restful API endpoints and authentication
- Modelscript (https://repetere.github.io/modelscript/) - Data wrangling framework similar to numpy/pandas. Used for TSV -> sqlite

### Client Code
- See: 
  - https://github.com/yawetse/variant-search/blob/master/content/container/periodicjs.container.default/views/react/index.ejs
  - https://github.com/yawetse/variant-search/blob/master/public/scripts/webapp.js
- Built with JSONX - https://github.com/repetere/jsonx - React JSON Syntax - Construct React elements, JSX and HTML with JSON without transpilers.
  - Build basic Server Side React rendering
  - Purposely not using Redux in favor of useGlobalState hook.

## Implementation

## Screenshots

### Main Interface
![Main Interface](https://github.com/yawetse/variant-search/blob/master/docs/screenshots/webapp-initial.png?raw=true) 

### Main Interface - Auto Suggest
![Auto Suggest](https://github.com/yawetse/variant-search/blob/master/docs/screenshots/webapp-autosuggest.png?raw=true) 

### Main Interface - Gene Variants
![Gene Results](https://github.com/yawetse/variant-search/blob/master/docs/screenshots/webapp-results.png?raw=true) 

### REST - auto suggest
![Auto Suggest](https://github.com/yawetse/variant-search/blob/master/docs/screenshots/rest-autosuggest.png?raw=true) 

### REST - gene variants
![Gene Variants](https://github.com/yawetse/variant-search/blob/master/docs/screenshots/rest-genes.png?raw=true) 


