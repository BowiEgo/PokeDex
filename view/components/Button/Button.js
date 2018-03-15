/**
 * Button
 * @prop {type} 按钮类型，类型：string，可选值：'primary'，默认：'primary'
 * @flow
*/
"use strict"

import * as React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

type Props = {

}

export default class Button extends React.Component<Props, {}> {
  
  constructor(props: Props) {
    super(props)
  }

  _renderContent() {
    return (
      <View style={[styles.content]}>
        {image}
        {text}
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._renderContent}
      </View>
    )
  }
}
