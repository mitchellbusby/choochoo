import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';

const renderRoot = (Component) => {
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderRoot(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    renderRoot(App);
  })
};
