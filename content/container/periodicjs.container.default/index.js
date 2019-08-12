'use strict';
const $p = require('periodicjs');
const modelscript = require('modelscript/build/modelscript.cjs');
const path = require('path');
const tsvFilePath = path.join($p.config.app_root, 'content/data/gene_data/variants.tsv');

async function hasGenes() {
  const numOfGenes = await $p.datas.get('standard_gene').model.count({});
  return Boolean(numOfGenes);
}
exports.hasGenes = hasGenes;

async function insertGenes({ tsvData, }) { 
  return await $p.datas.get('standard_gene').create({ newdoc: tsvData, bulk_create: true, });
}
exports.insertGenes = insertGenes;

module.exports = async function containerInit() {
  $p.status.on('configuration-complete', async () => {
    const hasGeneData = await hasGenes();
    if (hasGeneData === false) {
      const tsvData = await modelscript.csv.loadTSV(tsvFilePath);
      await insertGenes({ tsvData, });
    }
  });
  return true;
};