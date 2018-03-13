/* 
 * PlaygroundPage
 * @flow
*/ 
"use strict"

import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View
} from 'react-native'

import TouchableBounce from '../../components/TouchableBounce'
import TouchableFade from '../../components/TouchableFade'

/* <PlaygroundPage />
============================================================================= */

type Props = {
}

export default class PlaygroundPage extends Component<{}> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableBounce>
          <Image source={require('../../assets/img/001.png')}/>
        </TouchableBounce>
        <TouchableFade
          duration={500}
          fadeStatus="in">
          <Image source={require('../../assets/img/002.png')}/>
        </TouchableFade>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center'
  }
})