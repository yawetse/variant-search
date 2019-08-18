import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialGlobalState = {
  selectedGene: undefined,
};
const globalActions = {
  setGene: (store, Gene) => {
    console.log({ store, Gene });
    store.setState({
      selectedGene: Gene,
    });
  },
};

export const useGlobal = useGlobalHook(React, initialGlobalState, globalActions);