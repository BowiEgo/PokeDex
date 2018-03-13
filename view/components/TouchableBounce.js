/**
 * TouchableBounce
 * flow
 */

import * as React from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'

import { BounceAnimation } from '../common/animations'

type Props = {
  style: Object,
  children: any
}

const DEFAULT_SCALE = 1

class TouchableBounce extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props)

    this.touchAnimation = new BounceAnimation(DEFAULT_SCALE)
  }

  static defaultProps = {
    containerStyle: null,
  }

  _handleActivePressIn = () => {
    this._bounceTo(1.2, 0.1, 0)
  }

  _handleActivePressOut = () => {
    this._bounceTo(1, 0.4, 30)
  }

  _handlePress = () => {
    this._bounceTo(1, 20, 20)
  }

  _bounceTo = (value, velocity, bounciness, callback) => {
    this.touchAnimation.start(value, velocity, bounciness, callback)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._handlePress}
        onPressIn={this._handleActivePressIn}
        onPressOut={this._handleActivePressOut}>
        <Animated.View style={[this.touchAnimation.animations, this.props.containerStyle]}>{this.props.children}</Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default TouchableBounce
