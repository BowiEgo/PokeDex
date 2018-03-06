import React, { Component } from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class DiscoverPage extends Component {

  componentDidMount() {
    console.log(this.props.navigation)
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      console.log(this.props.navigation.state)
      StatusBar.setBarStyle('dark-content')
      Platform.os === 'android' && StatusBar.setBackgroundColor('#ff9999')
    })
  }
  
  componentWillUnmount() {
    this._navListener.remove()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          发现
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
