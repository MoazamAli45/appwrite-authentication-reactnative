import React from 'react';
import {AppwriteContextProvider} from './appwrite/AppwriteContext';
import Router from './routes/Router';

const App = () => {
  return (
    <AppwriteContextProvider>
      <Router />
    </AppwriteContextProvider>
  );
};

export default App;
