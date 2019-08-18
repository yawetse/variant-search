import React, { Component, } from 'react';
import ReactDataGrid from 'react-data-grid';

const columnNames = ['Gene', 'Nucleotide Change', 'Protein Change', 'Other Mappings', 'Alias', 'Transcripts', 'Region', 'Reported Classification', 'Inferred Classification', 'Source', 'Last Evaluated', 'Last Updated', 'URL', 'Submitter Comment', 'Assembly', 'Chr', 'Genomic Start', 'Genomic Stop', 'Ref', 'Alt', 'Accession', 'Reported Ref', 'Reported Alt',
];

const emptyTable = ({ titleText = 'You have no Gene selected', loading = false, }) => {
  return (
    <div className="empty">
      {loading
        ? ( <div className="loading loading-lg"></div>)
        : (
          <div className="empty-icon">
            <i className="icon icon-3x icon-stop"></i>
          </div>
        )
      }
      <p className='empty-title h5' >
        {titleText}
      </p>
      <p className='empty-subtitle'>
        Search for a Gene to get started
      </p>
    </div>
  );
};

export default class AppDataGrid extends Component{
  constructor(props) {
    super();
    this.state = {
      selectedGene: props.globalState.selectedGene,
      loading:false,
      rows:[],
    };
  }
  loadGeneData() {
    fetch(`/basic_api/v1/genes/${this.state.selectedGene}?format=json`)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ rows: responseJSON.data.genes, loading: false, });
      })
      .catch(e => {
        console.error(e);
        this.setState({ loading: false, });
      });
  }
  static getDerivedStateFromProps(props, state) {
    const loading = state.selectedGene!== props.globalState.selectedGene
    return {
      selectedGene: props.globalState.selectedGene,
      loading,
    };
  }
  componentDidMount() {
    if (this.state.selectedGene) {
      this.loadGeneData();
    }
  }
  componentDidUpdate() {
    if (this.state.selectedGene && this.state.loading) {
      this.loadGeneData();
    }
  }
  setRows(rows) {
    this.state.setState({ rows, });
  }
  render() {
    const columns = columnNames.map(colName => {
      // if(colName==='URL'){
      // column.formatter = function({value}){
      //   return <ProgressBar now={value} label={`${value}%`} />;
      // }
      // // }
      const column = {
        key: colName,
        name: colName,
      };
      if (colName === 'Gene') column.frozen = true;
      return column;
    });
    const dataGridProps = {
      columns,
      rowGetter: i => this.state.rows[ i ],
      rowsCount: this.state.rows.length,
    };
    if (this.state.loading) {
      return emptyTable({ loading:true, });
    } else if (!this.state.selectedGene) {
      return emptyTable({ titleText:'You have no Gene selected', });
    } else if (this.state.rows.length) {
      return <ReactDataGrid {...dataGridProps}/>
    } else {
      return emptyTable({ titleText:'You have there are no Gene variants', });
    }
  }
}