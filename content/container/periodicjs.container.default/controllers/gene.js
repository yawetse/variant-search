'use strict';
const $p = require('periodicjs');
const routeUtils = $p.utilities.routing;

exports.forceReturnJSON = async function forceReturnJSON(req, res, next) {
  req.query.format = 'json';
  next();
};

// http://localhost:8786/basic_api/v1/genes/PGAM4?format=json
exports.loadGene = async function loadGene(req, res) {
  try {
    const { params, } = req;  
    const genes = await $p.datas.get('standard_gene').search({
      query: {
        Gene: (params.id||'').toUpperCase(),
      },
    });
    res.json(routeUtils.formatResponse({
      result: 'success',
      genes,
      status: 200,
    }));
  } catch (e) {
    throw e;
  }
};

// http://localhost:8786/basic_api/v1/search/PG?format=json
exports.searchGenes = async function searchGenes(req, res) {
  try {
    const { params, } = req;  
    const genes = await $p.datas.get('standard_gene').search({
      query: {
        Gene: { $like: `%${(params.search || '').toUpperCase()}%`, },
      },
      // attributes:['Gene'],
      // fields:'Gene',
    });
    const uniqueGenes = new Set(genes.map(geneItem => geneItem.Gene));
    res.json(routeUtils.formatResponse({
      result: 'success',
      genes: Array.from(uniqueGenes).sort(),
      status: 200,
    }));
  } catch (e) {
    throw e;
  }
};