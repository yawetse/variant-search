import React, { Component, } from 'react';
import Autosuggest from 'react-autosuggest';

export default class AppAutoSuggest extends Component {
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
    return (
      <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
      getSuggestionValue={(suggestion) => {
        this.props.globalActions.setGene(suggestion);
        return suggestion;
      }}
      renderSuggestion={suggestion => <span>{suggestion}</span>}
      inputProps={inputProps} />
    );
  }
}
