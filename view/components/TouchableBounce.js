/**
 * TouchableBounce
 * flow
 */

import * as React from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'

import { FadeAnimation, BounceAnimation } from '../common/animations'

type Props = {
  style: Object,
  children: any
}

type State = {
  scale: any
}

let scale = new Animated.Value(1)

const DEFAULT_ANIMATION_DURATION: number = 150

class TouchableBounce extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  static defaultProps = {
    containerStyle: null,
    animation: new FadeAnimation({ animationDuration: DEFAULT_ANIMATION_DURATION }),
  }

  _handleActivePressIn = () => {
    this._bounceTo(2, 0.1, 0)
  }

  _handleActivePressOut = () => {
    this._bounceTo(1, 0.4, 10)
  }

  _handlePress = () => {
    this._bounceTo(2, 10, 20)
  }

  _bounceTo = (value, velocity, bounciness, callback) => {
    Animated.spring(scale, {
      toValue: value,
      velocity,
      bounciness,
    }).start(callback)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPressOut={this._handlePress}
        onPressIn={this._handleActivePressIn}
        onPressOut={this._handleActivePressOut}>
        <Animated.View style={[{transform: [{scale: scale}]}, this.props.style]}>{this.props.children}</Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default TouchableBounce
