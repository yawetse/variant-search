'use strict';

const periodic = require('periodicjs');
const extensionRouter = periodic.express.Router();
const geneRouter = periodic.express.Router();
const searchRouter = periodic.express.Router();
const apiRouter = periodic.express.Router();
const controllers = require('../controllers');
const oauth2serverControllers = periodic.controllers.extension.get('periodicjs.ext.oauth2server').auth;
const jsonx = require('jsonx');
const webappSSR = require('../../../../public/scripts/webapp');

geneRouter.get('/:id', controllers.gene.loadGene);
searchRouter.get('/genes/:search', controllers.gene.searchGenes);

apiRouter.use(oauth2serverControllers.isClientAuthenticated);

apiRouter.use('/v1/genes', geneRouter);
apiRouter.use('/v1/search', searchRouter);

extensionRouter.use('/basic_api', apiRouter);
extensionRouter.get('*', (req, res) => {
  // console.log({ webappSSR });
  const viewtemplate = {
    viewname: 'react/index',
    themename: periodic.settings.container.name,
  };
  const viewdata = {
    periodic: {
      appname: periodic.settings.name,
    },
    webappHTML: jsonx.outputHTML({ jsonx: webappSSR.webApplicationJSONX, }),
    // webappHTML: jsonx.outputHTML({webappSSR.App}),
  };
  periodic.core.controller.renderView(req, res, viewtemplate, viewdata);
});
//http://localhost:8786/api/v1/genes/genes/sokad?format=json
module.exports = extensionRouter;