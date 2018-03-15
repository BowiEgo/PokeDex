/**
 * StatusBarWithBg
 * @prop {backgroundColor} 类型：string，默认：'#ff9999'
 * @flow
*/
"use strict"

import React from 'react'
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { screen } from '../common/utils'

const StatusBarWithBg = ({backgroundColor = '#ff9999', ...props}) => (
  <View style={[styles.statusBarBackGround, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
)

export default StatusBarWithBg

const styles = StyleSheet.create({
  statusBarBackGround: {
    position: 'absolute',
    top: 0,
    width: screen.width,
    height: 40,
    backgroundColor: '#ff9999',
  },
})
