'use strict';
const Sequelize = require('sequelize');

const scheme = {
  _id: {
    type: Sequelize.INTEGER,
    // type: Sequelize.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  Gene: {
    type: Sequelize.STRING,
    // default: 'draft',
  },
  'Nucleotide Change': {
    type: Sequelize.STRING,
    // unique: 'item_name',
  },
  'Protein Change': {
    type: Sequelize.STRING,
  },
  'Other Mappings': {
    type: Sequelize.TEXT,
  },
  Alias: {
    type: Sequelize.STRING,
  },
  Transcripts: {
    type: Sequelize.STRING,
  },
  Region: {
    type: Sequelize.STRING,
  },
  'Reported Classification': {
    type: Sequelize.STRING,
  },
  'Inferred Classification': {
    type: Sequelize.STRING,
  },
  'Source': {
    type: Sequelize.STRING,
  },
  'Last Evaluated': {
    type: Sequelize.DATE,
    // defaultValue: Sequelize.NOW,
  },
  'Last Updated': {
    type: Sequelize.DATE,
    // defaultValue: Sequelize.NOW,
  },
  URL: {
    type: Sequelize.STRING,
  },
  'Submitter Comment': {
    type: Sequelize.TEXT,
  },
  Assembly: {
    type: Sequelize.STRING,
  },
  Chr: {
    type: Sequelize.INTEGER,
  },
  'Genomic Start': {
    type: Sequelize.INTEGER,
  },
  'Genomic Stop': {
    type: Sequelize.INTEGER,
  },
  Ref: {
    type: Sequelize.STRING,
  },
  Alt: {
    type: Sequelize.STRING,
  },
  Accession: {
    type: Sequelize.STRING,
  },
  'Reported Ref': {
    type: Sequelize.STRING,
  },
  'Reported Alt': {
    type: Sequelize.STRING,
  },
};

const options = {
  underscored: true,
  timestamps: true,
  indexes: [{
    fields: ['createdat'],
  }],
  createdAt: 'createdat',
  updatedAt: 'updatedat',
};

const associations = [
  // {
  //   source: 'user',
  //   association: 'hasMany',
  //   target: 'item',
  //   options: {
  //     as: 'primaryauthor',
  //     foreignKey: 'primaryauthor',
  //   },
  // },
  // {
  //   target: 'item',
  //   association: 'hasMany',
  //   source: 'asset',
  //   options: {
  //     as: 'primaryasset',
  //     foreignKey: 'primaryasset',
  //   },
  // },
];

module.exports = {
  scheme,
  options,
  associations,
  coreDataOptions: {
    docid: ['_id'],
    sort: { createdat: -1, },
    search: ['Gene', ],
    // limit: 500,
    // skip: 0,
    population: '',
    // fields: {},
    // pagelength:15,
    // tract_changes:true,
    // xss_whitelist:['p','b'],
  },
};