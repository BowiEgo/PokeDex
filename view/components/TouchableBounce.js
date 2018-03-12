import React from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { screen } from '../common/utils'

export default class TouchableBounce extends React.component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableWithoutFeedback>
        {this.props.childrend}
      </TouchableWithoutFeedback>
    )
  }
}
