/**
 * ButtonComponent
 * @prop {type} 按钮类型，类型：string，可选值：'primary'，默认：'primary'
 * @prop {shape} 按钮形状，类型：string，可选值：'round'，默认：'round', 'circle'
 * @prop {width} 按钮宽度，类型：number，默认：null
 * @prop {height} 按钮高度，类型：number，默认：50
 * @prop {style} 自定义按钮样式, 类型：styleObject
 * @prop {onPress} 触发onPress回调方法, 类型：function
 * @prop {disabled} 类型：boolean，默认：false
 * @prop {disabledOpacity} 类型：number，默认：0.5
 * @flow
*/
"use strict"

import * as React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import Button from './Button'

type Props = {
  type: string,
  shape: string,
  style: Object,
  width: number,
  height: number,
  buttonStyle: Object,
  backgroundColors: string[],
  onPress: func,
  disabled: boolean,
  disabledOpacity: number,
  disabledGradientStart: Object,
  disabledGradientEnd: Object,
  gradientStart: Object,
  gradientend: Object,
}

type State = {
}

const defaultProps = {
  type: 'primary',
  shape: 'round',
  width: null,
  height: 50,
  backgroundColors: ['#4DC7A4', '#66D37A'],
  disabled: false,
  disabledOpacity: 0.5,
  disabledGradientStart: {x: 0, y: 0},
  disabledGradientEnd: {x: 0, y: 0},
  gradientStart: {x: 0.5, y: 1},
  gradientend: {x: 1, y: 1}
}

export default class ButtonComponent extends React.Component<Props, State> {
  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props)
  }

  _renderButton({ textStyle = styles.text, imageStyle = styles.image }) {
    let button

    button = (
      <View><Text>Button</Text></View>
      // <Button
      //   textStyle={this.props.textStyle || textStyle}
      //   imageStyle={this.props.imageStyle || imageStyle}
      //   text={this.props.text}
      //   image={this.props.image}
      // />
    )

    return button
  }

  _renderContent() {
    const { 
      type,
      shape,
      height,
      buttonStyle,
      disabled,
      disabledGradientStart,
      disabledGradientEnd,
      gradientStart,
      gradientEnd,
      backgroundColors
    } = this.props

    const disabledStyle = disabled
      ? { opacity: disabledOpacity } 
      : null

    let shapeStyle
    if(['round', 'circle'].includes(shape)) {
      shapeStyle = {
        borderRadius: height / 2
      }
    }
    
    const border = type === 'border' && styles.border
    
    let content
    console.log(type)
    if(type === 'primary') {
      content = (
        <LinearGradient
          start={disabled ? disabledGradientStart : gradientStart}
          end={disabled ? disabledGradientEnd : gradientEnd}
          colors={backgroundColors}
          collapsable={false}
          style={[styles.button, shapeStyle, buttonStyle, disabledStyle]}>
        >
          {this._renderButton({ textStyle: styles.text })}
        </LinearGradient>
      )
    } else {
      content = (
        <View style={[styles.button, border, shapeStyle, buttonStyle, disabledStyle]}>
          {this._renderButton({ textStyle: styles.secondaryText })}
        </View>
      )
    }

    return content
  }

  render() {
    const { style, width, height, onPress, disabled } = this.props

    return (
      <TouchableOpacity
        accessibilityTraits="button" // 无障碍元素特性accessibilityTraits (iOS) https://reactnative.cn/docs/0.51/accessibility.html
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.9}
        style={[styles.container,
          {
            width: width,
            height: height
          },
          style]}
        >
       {this._renderContent()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  border: {
    borderWidth: 1,
    borderColor: '#7F91A7',
  },
  image: {
    marginRight: 12,
  },
  text: {
    letterSpacing: 1,
    fontSize: 12,
    color: '#fff'
  },
  secondaryText: {
    letterSpacing: 1,
    fontSize: 12,
    color: '#7F91A7'
  }
})

