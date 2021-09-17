import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './header';
import PropTypes from 'prop-types';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <CssBaseline />
      <Container maxWidth="md">{children}</Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
