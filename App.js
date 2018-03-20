/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { TabNav, HomeDrawNav, CustomStackNav } from './view/router/custom'
import Playground from './view/pages/Playground'

export default class App extends Component<{}> {
  constructor() { 
    super()
  }

  render() {
    return (
      // <TabNav/>
      // <CustomStackNav/>
      <Playground/>
    )
  }
}
