/* 
 * PlaygroundPage
 * @flow
*/ 
"use strict"

import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

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
        {this.state.content}
      </View>
    )
  }
}
