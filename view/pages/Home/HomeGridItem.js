import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { screen } from '../../common/utils'

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
          <Text style={styles.serialNumber}>{this.props.serialNumber}</Text>
          <Text style={styles.name}>{this.props.name}</Text>
          <View style={styles.abilitiesContainer}>
            <View 
              style={[styles.abilities, {backgroundColor: '#9bcc50'}]}>
              <Text style={{color: '#000'}}>Grass</Text>
            </View>
            <View 
              style={[styles.abilities, { backgroundColor: '#b97fc9'}]}>
              <Text style={{color: '#fff'}}>Poison</Text>
            </View>
          </View>
        </View>
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
  serialNumber: {
    marginBottom: 8,
    color: 'grey',
    fontSize: 14,
    fontWeight: 'bold',
  },
  name: {
    color: '#333',
    fontSize: 16,
  },
  abilitiesContainer: {
    flexDirection: 'row',
    marginTop: 6
  },
  abilities: {
    width: 70,
    height: 20,
    marginRight: 4,
    alignItems: 'center',
    borderRadius: 3,
  }
})
