import React from 'react';

import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper'; 
import { Navigator } from './src/navigator/Navigator';

export const App = () => {
  return (
    <PaperProvider> 
      <Navigator />
    </PaperProvider>
  );
};

export default App;
