
const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');
const { act, isCompositeComponent, } = ReactTestUtils;
const ReactDOM = require('react-dom');
const ReactDOMElements = require('react-dom-factories');
const { create, } = require('react-test-renderer');
const { JSDOM, } = require('jsdom');
const jsonx = require('jsonx');

const chai = require('chai');
const expect = require('chai').expect;
const { webApplicationJSONX, App, AppAutoSuggest, AppDataGrid, useGlobal, initialGlobalState, globalActions, columnNames, } = require('../../public/scripts/webapp');
let dom;
let container;

describe('React WebApp', function () {
  this.timeout(10000);
  beforeEach('initialize dom', function () {
    dom = new JSDOM(`<!DOCTYPE html>
    <body>
      <div id="root"/>
    </body>`);
    global.window = dom.window;
    global.window.React = React;
    global.document = global.window.document;
    container = document.querySelector('#root');
  });
  describe('AppDataGrid', () => {
    it('should be a valid component', () => {
      isCompositeComponent(AppDataGrid);
    });
    it('should handle empty state', () => {
      const dg = create(React.createElement(AppDataGrid, {
        globalState: {},
      }));
      expect(dg.root.instance.state.selectedGene).to.be.undefined;
      expect(dg.root.instance.state.loading).to.be.false;
      expect(dg.root.instance.state.rows).to.be.an('array').and.to.have.lengthOf(0);
      expect(dg.toJSON().children[ 2 ].children[ 0 ]).to.eql('Search for a Gene to get started');
      // console.log('dg.instance',dg.root.instance)
      // console.log('dg.toJSON()',dg.toJSON())
      // console.log({ dg })
      // console.log('toJSON', JSON.stringify(dg.toJSON(), null, 2));
    });
  });
  /*
  describe('App', () => {
    it('should render a DOM Component', () => {
      // console.log({ container, });
      act(() => {
        
        jsonx.jsonxRender({ 
          jsonx: webApplicationJSONX, 
          resources: {},
          DOM: container,
          // DOM: dom.querySelector('#root'),
        });
        // ReactDOM.render(AppAutoSuggest, container);
      });
      // console.log({ container, });
      // console.log('react-autosuggest__container', container.querySelector('.react-autosuggest__container'));
      // const testDOM = ReactTestUtils.renderIntoDocument(App);
      // console.log({testDOM,App});
      // expect(ReactTestUtils.isDOMComponent(testDOM)).to.be.true;
      // expect(App).to.be.a('function');
    });
    // it('should handle 404 requests', async () => {
    //   const error404 = await chai.request($p.app).post('/');
    //   expect(error404.status).to.eql(404);
    // });
  });
  */
});
