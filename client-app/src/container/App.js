import React from 'react';
import { useGlobal, } from '../hooks/state';
import { Card, } from 'jsonx/design/spectre.umd';
import * as Layout from '@react-spectre/layout';
import AppAutoSuggest from '../components/AppAutoSuggest';
import AppDataGrid from '../components/AppDataGrid';

const App = () => {
  const [ globalState, globalActions, ] = useGlobal();
  const autoSuggestProps = { globalState, globalActions, };
  const dataGridProps = { globalState, };
  return (
    <Layout.Grid style={{ marginTop: '1rem', }}>
      <Layout.Row>
        <Layout.Col all={12}>
          <Layout.Navbar>
            <Layout.Section>
              <Layout.Brand href="/">
                Gene Variant Search
              </Layout.Brand>
            </Layout.Section>
            <Layout.Section>
              <AppAutoSuggest {...autoSuggestProps} />
            </Layout.Section>
          </Layout.Navbar>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row style={{ marginTop: '1rem', }}>
        <Layout.Col all={12}>
          <Card.Card>
            <Card.Body>
              <AppDataGrid {...dataGridProps}/>
            </Card.Body>
          </Card.Card>
        </Layout.Col>
      </Layout.Row>
    </Layout.Grid>
  );
};

export default App;
