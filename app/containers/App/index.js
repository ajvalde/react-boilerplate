/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Insert from 'containers/Insert/Loadable';
import Update from 'containers/Update/Loadable';
import Delete from 'containers/Delete/Loadable';
import ClassifySingle from 'containers/ClassifySingle/Loadable';
import BatchClassifySingle from 'containers/BatchClassifySingle/Loadable';
import SubmitIndex from 'containers/SubmitIndex/Loadable';
import Johannes from 'containers/Johannes/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/Johannes" component={Johannes} />
        <Route path="/Features" component={FeaturePage} />
        <Route path="/SubmitIndex" component={SubmitIndex} />
        <Route path="/ClassifySingle" component={ClassifySingle} />
        <Route path="/BatchClassifySingle" component={BatchClassifySingle} />
        <Route path="/Insert" component={Insert} />
        <Route path="/Update" component={Update} />
        <Route path="/Delete" component={Delete} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
