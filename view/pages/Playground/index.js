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
      <View style={{ paddingTop: 30 }}>
        {/* <TouchableBounce>
          <Image source={require('../../assets/img/001.png')}/>
        </TouchableBounce> */}
      </View>
    )
  }
}
