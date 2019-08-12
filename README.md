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

## Datasource

A zipped TSV file of variants is available in /data/variants.tsv.zip. Each row in the TSV file represents a genomic variant and contains a Gene column with the gene name. A variant will belong to one and only one gene, but multiple variants may belong to the same gene.

## Implementation

If you are comfortable with Python and/or React, please use these technologies for your app. You may use any additional frameworks, languages, databases, libraries, etc. that you find appropriate.

Our expectation is you will be writing some server code, client code, and applying some basic styling to create a working web application. The application should include unit tests.

Here’s an example of how you might group and display the information:


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


