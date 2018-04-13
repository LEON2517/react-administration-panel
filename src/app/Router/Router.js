import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Layout } from 'components';

import { AccountPage, BillsPage } from 'pages';

/**
 * Роутер приложения
 *
 * @returns {ReactElement}
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect from="/" exact to="account" />
          <Route path="/account" exact component={AccountPage} />
          <Route path="/bills" exact component={BillsPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
