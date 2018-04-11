import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Layout } from 'components';

import { IndexPage } from 'pages';

/**
 * Роутер приложения
 *
 * @returns {ReactElement}
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" exact component={IndexPage} />
      </Layout>
    </BrowserRouter>
  );
}
