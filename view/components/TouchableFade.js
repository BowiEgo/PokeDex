/**
 * TouchableBounce
 * flow
 */

import * as React from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'

import { FadeAnimation } from '../common/animations'

type Props = {
  style: Object,
  children: any
}

type States = {
  fadeStatus: string
}

class TouchableFade extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props)

    this.state = {
      fadeStatus: this.props.fadeStatus
    }

    this.touchAnimation = this.state.fadeStatus === 'in' ? new FadeAnimation(1, this.props.duration) : new FadeAnimation(0, this.props.duration)
  }

  static defaultProps = {
    containerStyle: null,
    fadeStatus: 'in',
    duration: 300
  }

  _handlePress = () => {
    this._fade()
    switch(this.state.fadeStatus) {
      case 'in': 
        this._fade(0)
        this.setState({
          fadeStatus: 'out'
        })
        break
      case 'out':
        this._fade(1)
        this.setState({
          fadeStatus: 'in'
        })
        break
      default:
        break
    }
  }

  _fade = (value, duration, callback) => {
    this.touchAnimation.start(value, duration, callback)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._handlePress}>
        <Animated.View style={[this.touchAnimation.animations, this.props.style]}>{this.props.children}</Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default TouchableFade
