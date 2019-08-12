const { jsonx: JSONX, React, useGlobalHook, Spectre, Autosuggest, ReactDataGrid, } = window;
const columnNames = ['Gene', 'Nucleotide Change', 'Protein Change', 'Other Mappings', 'Alias', 'Transcripts', 'Region', 'Reported Classification', 'Inferred Classification', 'Source', 'Last Evaluated', 'Last Updated', 'URL', 'Submitter Comment', 'Assembly', 'Chr', 'Genomic Start', 'Genomic Stop', 'Ref', 'Alt', 'Accession', 'Reported Ref', 'Reported Alt',
];
const initialGlobalState = {
  selectedGene: undefined,
};
const globalActions = {
  setGene: (store, Gene) => {
    store.setState({
      selectedGene: Gene,
    });
  },
};
const useGlobal = useGlobalHook(React, initialGlobalState, globalActions);
const emptyTable = ({ titleText='You have no Gene selected', loading=false, })=>JSONX.getReactElementFromJSONX.call({
// const emptyTable = JSONX.compile.call({
  componentLibraries: {
    Spectre,
  },
}, {
  component: 'div',
  props: {
    className:'empty',
  },
  children: [
    loading
      ?
      {
        component: 'div',
        props: {
          className:'loading loading-lg',
        },
      }
      :
      {
        component: 'div',
        props: {
          className:'empty-icon',
        },
        children: [
          {
            component: 'i',
            props: {
              className:'icon icon-3x icon-stop',
            },
          },
        ],
      },
    {
      component: 'p',
      props: {
        className:'empty-title h5',
      },
      children:titleText,
    },
    {
      component: 'p',
      props: {
        className:'empty-subtitle',
      },
      children:'Search for a Gene to get started',
    },
  ],
});

class AppDataGrid extends React.Component{
  constructor(props) {
    super();
    this.state = {
      selectedGene: props.globalState.selectedGene,
      loading:false,
      rows:[],
    };
  }
  componentDidMount() {
    if (this.state.selectedGene) {
      this.setState({ loading: true, });
      fetch(`/basic_api/v1/genes/${this.state.selectedGene}?format=json`)
        .then(response => response.json())
        .then(responseJSON => {
          this.setState({ rows: responseJSON.data.genes, loading:false, });
        })
        .catch(e => {
          console.error(e);
          this.setState({ loading: false, });
        });
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

    if (this.state.loading) {
      return emptyTable({ loading:true, });
    } else if (!this.state.selectedGene) {
      return emptyTable({ titleText:'You have no Gene selected', });
    } else if (this.state.rows.length) {
      return JSONX.getReactElementFromJSONX.call({
        reactComponents: {
          ReactDataGrid,
        },
      }, {
        component: 'ReactDataGrid',
        props: {
          columns,
          rowGetter:i => this.state.rows[i],
          rowsCount: this.state.rows.length,
        },
      },
      );
    } else {
      return emptyTable({ titleText:'You have there are no Gene variants', });
    }
    
  }
}

const autoSuggestContext = {
  reactComponents: {
    Autosuggest,
  },
  componentLibraries: {
    Spectre,
  },
  disableRenderIndexKey:true,
};
class AppAutoSuggest extends React.Component {
  constructor() {
    super();
    this.state = { value: '', suggestions: [], };
  }
  onChange(event, { newValue, method, }){
    this.setState({ value: newValue, });
  }
  onSuggestionsFetchRequested({ value, }){
    fetch(`/basic_api/v1/search/genes/${value}?format=json`)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ suggestions: responseJSON.data.genes, });
      })
      .catch(console.error);
  }
  onSuggestionsClearRequested() {
    this.setState({ suggestions: [], });
  }
  render() { 
    const { value, suggestions, } = this.state;
    const inputProps = {
      placeholder: 'Search Genes',
      value,
      onChange: this.onChange.bind(this),
    };
    return JSONX.getReactElementFromJSONX.call(autoSuggestContext, {
      component: 'Autosuggest',
      props: {
        suggestions,
        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested.bind(this),
        onSuggestionsClearRequested: this.onSuggestionsClearRequested.bind(this),
        getSuggestionValue: (suggestion) => {
          this.props.globalActions.setGene(suggestion);
          return suggestion;
        },
        renderSuggestion(suggestion) {
          return JSONX.getReactElementFromJSONX({
            component: 'span',
            children: suggestion,
          });
        },
        inputProps,
      },
    });
  }
}

const AppBoundContext = {
  reactComponents: {
    Autosuggest,
    AppAutoSuggest,
    AppDataGrid,
  },
  componentLibraries: {
    Spectre,
  },
};
const App = () => {
  const [globalState, globalActions, ] = useGlobal();
  // return 'hello app';
  return JSONX.getReactElementFromJSONX.call(AppBoundContext, {
    component: 'Spectre.Layout.Grid',
    props: {
      style: {
        marginTop:'1rem',
      },
    },
    children: [
      {
        component: 'Spectre.Layout.Row',
        prpos: {
        },
        children: [
          {
            component: 'Spectre.Layout.Col',
            props: {
              all: 12,
              
            },
            
            children: [
              {
                component: 'Spectre.Navbar.Navbar',
                children: [
                  {
                    component: 'Spectre.Navbar.Section',
                    children: [
                      {
                        component: 'Spectre.Navbar.Brand',
                        props: {
                          href:'/',
                        },
                        children:'Gene Variant Search',
                      },
                    ],
                  },
                  {
                    component: 'Spectre.Navbar.Section',
                    children: [
                      {
                        component: 'AppAutoSuggest',
                        props: {
                          globalState, globalActions,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        component: 'Spectre.Layout.Row',
        props: {
          style: {
            marginTop:'1rem',
          },
        },
        children: [
          {
            component: 'Spectre.Layout.Col',
            props: {
              all: 12,
            },
            children: [
              {
                component: 'Spectre.Card.Card',
                children: [
                  {
                    component: 'Spectre.Card.Body',
                    children: [
                      {
                        component: 'AppDataGrid',
                        props: {
                          globalState,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
};
const webappBoundContext = {};
const webApplicationJSONX = {
  component: App,
};

window.addEventListener('DOMContentLoaded', () => {
  JSONX.jsonxRender.call(webappBoundContext, { 
    jsonx: webApplicationJSONX, 
    resources: { },
    querySelector:'#root', });
});

