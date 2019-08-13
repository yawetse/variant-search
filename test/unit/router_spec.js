

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const $p = require('periodicjs');
const periodicConfig = {
  debug: false,
  environment: 'development',
  skip_reconfig: true,
};
chai.use(chaiHttp);

describe('Express Routes', function () {
  this.timeout(10000);
  before('initialize periodic express app', function (done) {
    $p.init(periodicConfig)
      .then(() => {
        done();
      })
      .catch(done);
  });
  describe('GET /', () => {
    it('should render a reactapp with server side react', async () => {
      const [ssr_res, catchall_res, ] = await Promise.all([
        chai.request($p.app).get('/'),
        chai.request($p.app).get('/kjlfasdf'),
      ]);
      expect(ssr_res.status).to.eql(200);
      expect(ssr_res.text).includes('react');
      expect(catchall_res.status).to.eql(200);
      expect(catchall_res.text).includes('react');
    });
    it('should handle 404 requests', async () => {
      const error404 = await chai.request($p.app).post('/');
      expect(error404.status).to.eql(404);
    });
  });
  describe('GET /basic_api/v1/', () => {
    it('should require authentication for api endpoints', async () => {
      const [api_request_unauth, api_auth_req,] = await
      Promise.all([
        chai.request($p.app).get('/basic_api/v1/genes/braf'),
        chai.request($p.app).get('/basic_api/v1/genes/braf').auth('994c02016fd1a8921065a3977cf83bfe', 'a42a9beb600d65d7acdb779ee07144cb'),
      ]);
      expect(api_request_unauth.status).to.eql(401);
      expect(api_auth_req.status).to.eql(200);
    });
  });
  describe('GET /basic_api/v1/genes/:id', () => {
    it('should return gene variants', async () => {
      const [gene_req_ak2, gene_req_invalid,] = await
      Promise.all([
        chai.request($p.app).get('/basic_api/v1/genes/ak2').auth('994c02016fd1a8921065a3977cf83bfe', 'a42a9beb600d65d7acdb779ee07144cb'),
        chai.request($p.app).get('/basic_api/v1/genes/asdfasd').auth('994c02016fd1a8921065a3977cf83bfe', 'a42a9beb600d65d7acdb779ee07144cb'),
      ]);
      expect(gene_req_ak2.status).to.eql(200);
      expect(gene_req_invalid.status).to.eql(200);
      
      expect(gene_req_invalid.body.data.genes).to.have.lengthOf(0);

      expect(gene_req_invalid.body.data.genes).to.have.lengthOf(0);

      expect(gene_req_ak2).to.be.json;
      expect(gene_req_ak2.body.data.genes).to.be.an('array').and.have.lengthOf(3);
      expect(gene_req_ak2.body.data.genes[ 0 ]).to.have.keys('Accession', 'Alias', 'Alt', 'Assembly', 'Chr', 'Gene', 'Genomic Start', 'Genomic Stop', 'Inferred Classification', 'Last Evaluated', 'Last Updated', 'Nucleotide Change', 'Other Mappings', 'Protein Change', 'Ref', 'Region', 'Reported Alt', 'Reported Classification', 'Reported Ref', 'Source', 'Submitter Comment', 'Transcripts', 'URL', '_attributes', '_id', 'contenttypeattributes', 'createdat', 'entity_attributes', 'entitytype', 'extensionattributes', 'random', 'updatedat');
    });
  });
  describe('GET /basic_api/v1/search/genes/:term', () => {
    it('should return gene variants', async () => {
      const [search_req_ak, search_req_empty,] = await
      Promise.all([
        chai.request($p.app).get('/basic_api/v1/search/genes/akt').auth('994c02016fd1a8921065a3977cf83bfe', 'a42a9beb600d65d7acdb779ee07144cb'),
        chai.request($p.app).get('/basic_api/v1/search/genes/asdfasd').auth('994c02016fd1a8921065a3977cf83bfe', 'a42a9beb600d65d7acdb779ee07144cb'),
      ]);
      expect(search_req_ak.status).to.eql(200);
      expect(search_req_empty.status).to.eql(200);
      
      expect(search_req_empty.body.data.genes).to.have.lengthOf(0);

      expect(search_req_empty.body.data.genes).to.have.lengthOf(0);

      expect(search_req_ak).to.be.json;
      expect(search_req_ak.body.data.genes).to.be.an('array').and.have.lengthOf(4);
      expect(search_req_ak.body.data.genes).to.include('AKT1');
    });
  });
});
