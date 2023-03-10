import React from 'react';
import { Provider } from 'react-redux'
import { init } from './db';

import store from './store'

init()
.then(() => console.log('db initialized success'))
.catch((err)=>{
  console.log("Database failed")
  console.log(err.message)
})

// navigation
import MainNavigator from './navigation'

export default function App() {
  return (<Provider store={store}><MainNavigator /></Provider>);
}
