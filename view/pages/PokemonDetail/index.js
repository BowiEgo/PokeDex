/* 
 * PokemonDetail
 * @flow
*/ 

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
import { colors, abilityColorMap } from '../../common/colors'

import StatusBarWithBg from '../../components/StatusBarWithBg'
import PageHeader from '../../components/PageHeader'
import SharedView from '../../router/SharedView'

/* <HomePage />
============================================================================= */

type Props = {
}

export default class PokemonDetailPage extends Component<Props, {}> {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  }

  constructor(props) {
    super(props)
    this.state = {
      abilities: ['Grass', 'Poison']
    }
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
      <View style={styles.container}>
        <StatusBarWithBg backgroundColor="#fff" barStyle="dark-content"/>
        <PageHeader
          title="妙蛙种子"
          titleStyle={styles.headerTitle}
        />
        <View style={styles.wrapper}>
          <SharedView name={`image-妙蛙种子`} containerRouteName='PokemonDetailPage'>
            <Image
              source={require('../../assets/img/001.png')}
            />
          </SharedView>
          <View style={styles.basicInfo}>
            <View style={styles.basicInfoTextContainer}>
              <Text style={styles.basicInfoText}>身高</Text>
              <Text style={{color: '#000', fontSize: 16}}>0.7m / 2'04"</Text>
            </View>
            <View style={styles.basicInfoTextContainer}>
              <Text style={styles.basicInfoText}>体重</Text>
              <Text style={{color: '#000', fontSize: 16}}>6.9kg / 15.2lbs</Text>
            </View>
            <View style={styles.basicInfoTextContainer}>
              <Text style={styles.basicInfoText}>分类</Text>
              <Text style={{color: '#000', fontSize: 16}}>种子宝可梦</Text>
            </View>
            <View style={styles.basicInfoTextContainer}>
              <Text style={styles.basicInfoText}>特性</Text>
              <Text style={{color: '#000', fontSize: 16}}>茂盛</Text>
            </View>
          </View>
          <View style={
            {
              width: screen.width,
              paddingHorizontal: 20,
              paddingVertical: 20,
              alignItems: 'flex-start'
            }
          }>
            <Text>属性</Text>
            <View style={styles.abilitiesContainer}>
              {this._renderAbilities(this.state.abilities)}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: colors.mainThemeColor,
    fontSize: 18,
    // fontWeight: '500',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    // height: screen.height
  },
  basicInfo: {
    width: screen.width * .9,
    height: 140,
    backgroundColor: '#30a7d7',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  basicInfoTextContainer: {
    width: screen.width * .45,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  basicInfoText: {
    height: 20,
    color: '#fff',
    height: 26
  },
  abilitiesContainer: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6
  },
  abilities: {
    width: screen.width * .25 - 26,
    height: 22,
    marginRight: 4,
    alignItems: 'center',
    borderRadius: 3,
  }
})
