/* 
 * HomeGridItem
 * @flow
*/ 
"use strict"

import React, { Component } from 'react'
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { screen } from '../../common/utils'
import { abilityColorMap } from '../../common/colors'
import TouchableBounce from '../../components/TouchableBounce'
import SharedView from '../../router/SharedView'

/* <HomeGridItem />
============================================================================= */

type Props = {
  containerStyle: Object,
  imageSource: String,
  serialNumber: Number,
  name: String,
  abilities: String[]
}

export default class HomeGridItem extends Component<Props, {}> {

  constructor(props) {
    super(props)
  }

  _renderAbilities = (abilities: string[]) => (
    abilities.map((item, index) => (
      <View
        key={index}
        style={[styles.abilities, {backgroundColor: abilityColorMap[item]}]}>
        <Text style={{color: '#fff', lineHeight: 20}}>{item}</Text>
      </View>
    ))
  )

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        activeOpacity={.8}
        onPress={this.props.onPress}>
        <TouchableBounce>
          <SharedView name={`image-${this.props.name}`} containerRouteName='HomePage'>
            <Image
              style={[{width: null, height: 150}]}
              source={this.props.imageSource}
            />
          </SharedView>
        </TouchableBounce>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            style={[{width: screen.width * .5 - 40, height: 30, alignItems: 'center', justifyContent: 'center'}]}
            source={require('../../assets/img/card-bg.png')}>
            <Icon style={styles.like} name={this.props.isLike ? 'ios-heart' : 'ios-heart-outline'} size={16} color={'#ff9999'} />
          </ImageBackground>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.serialNumber}>{this.props.serialNumber}</Text>
          <Text style={styles.name}>{this.props.name}</Text>
          <View style={styles.abilitiesContainer}>
            {this._renderAbilities(this.props.abilities)}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  wrapper: {
    padding: 10,
    backgroundColor: '#fff',
  },
  serialNumber: {
    marginBottom: 8,
    color: 'grey',
    fontSize: 14,
    fontWeight: 'bold',
  },
  name: {
    color: '#333',
    fontSize: 16
  },
  abilitiesContainer: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6
  },
  abilities: {
    width: screen.width * .25 - 26,
    marginRight: 4,
    alignItems: 'center',
    borderRadius: 3,
  }
})
