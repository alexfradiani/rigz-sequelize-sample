import Layout from './components/layout/layout';
import React from 'react';
import Users from './components/users/users';

function App() {
  return (
    <div className="App">
      <Layout>
        <Users />
      </Layout>
    </div>
  );
}

export default App;
