import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { screen } from '../../common/utils'

import Icon from 'react-native-vector-icons/Ionicons'

type Props = {
  imageSource: String
}

export default class HomeGridItem extends Component<Props> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Image
          style={[{width: null, height: 150}]}
          source={this.props.imageSource}
        />
        <View style={styles.wrapper}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.author}>来自：{this.props.author}</Text>
          <Text style={styles.time}>{this.props.time}</Text>
        </View>
        <Icon style={styles.like} name={this.props.isLike ? 'ios-heart' : 'ios-heart-outline'} size={16} color={'#ff9999'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
    marginVertical: 10,
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    padding: 10,
  },
  title: {
    marginBottom: 10,
    color: '#333',
    fontSize: 14,
  },
  author: {
    color: '#333',
    fontWeight: 'bold',
    lineHeight: 20,
    fontSize: 10,
  },
  time: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 10,
  },
  like: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
})
