import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store';
import {Menu} from './Drawer'
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Menu />
      </NavigationContainer>
    </Provider>
  )
}
export default App;