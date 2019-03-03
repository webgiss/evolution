import React from 'react';
import { Provider } from 'react-redux';

export const getReduxMockDecorator = (state) => {
    const store={
      dispatch:()=>{},
      getState:()=>state,
      subscribe:()=>(()=>{}),
    }
    
    return (getStory) => (
      <Provider store={store}>
        { getStory() }
      </Provider>
    );
  };
  