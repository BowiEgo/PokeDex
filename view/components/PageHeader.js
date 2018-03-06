import React, { PureComponent } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { screen } from '../common/utils'

export default class PageHeader extends PureComponent {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[styles.title, this.props.titleStyle]}>
          { this.props.title }
        </Text>
        {this.props.headerRight}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    // height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    marginHorizontal: 20,
    alignSelf: 'center',
    color: '#000'
  }
})
