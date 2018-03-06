import React, { Component } from 'react'
import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  Platform
} from 'react-native'

import store from '../../redux/store'
import { screen } from '../../common/utils'
import { colors } from '../../common/colors'

import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

import StatusBarWithBg from '../../components/StatusBarWithBg'
import PageHeader from '../../components/PageHeader'
import HomeGridItem from './HomeGridItem'

type State = {
  cardData: Array<any>,
  imageMap: Object
}

type Props = {
  navigation: Object
}

export default class HomePage extends Component<State, Props> {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      cardData: ds.cloneWithRows([
        {
          index: '1',
          name: 'Bulbasaur',
          nameCN: '妙蛙种子',
          abilities: ['Grass', 'Poison'],
          isLike: true,
          img: require('../../assets/img/001.png')
        },
        {
          index: '2',
          name: 'Ivysaur',
          nameCN: '妙蛙草',
          abilities: ['Grass', 'Poison'],
          isLike: true,
          img: require('../../assets/img/002.png')
        },
        {
          index: '3',
          name: 'Venusaur',
          nameCN: '妙蛙花',
          abilities: ['Grass', 'Poison'],
          isLike: false,
          img: require('../../assets/img/003.png')
        },
        {
          index: '4',
          name: 'Charmander',
          nameCN: '小火龙',
          abilities: ['Fire'],
          isLike: true,
          img: require('../../assets/img/004.png')
        },
        {
          index: '5',
          name: 'Charmeleon',
          nameCN: '火恐龙',
          abilities: ['Fire'],
          isLike: true,
          img: require('../../assets/img/005.png')
        },
        {
          index: '6',
          name: 'Charizard',
          nameCN: '喷火龙',
          abilities: ['Fire'],
          isLike: false,
          img: require('../../assets/img/006.png')
        }
      ])
    }
  }

  componentDidMount() {
    // this._navListener = this.props.navigation.addListener('didFocus', () => {
    //   StatusBar.setBarStyle('light-content')
    //   Platform.os === 'android' && StatusBar.setBackgroundColor(colors.mainThemeColor)
    // })

    console.log(store.getState())
  }
  
  // componentWillUnmount() {
  //   this._navListener.remove()
  // }

  _goPokemonDetail = () => {
    const { navigate } = this.props.navigation
    navigate('PokemonDetail')
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <StatusBarWithBg backgroundColor="#fff" barStyle="dark-content"/>
        <PageHeader
          title="Pokédex"
          titleStyle={styles.headerTitle}
          headerRight={(
            <Icon.Button
              name="ios-search"
              color={'#000'}
              size={24}
              backgroundColor="transparent"
              onPress={() => navigate('Search')}>
            </Icon.Button>
          )}
        />
        <View style={styles.wrapper}>
          <ImageBackground
            style={[styles.listContainerBg, {left: 0}]}
            source={require('../../assets/img/container-bg.png')}>
          </ImageBackground>
          <ImageBackground
            style={[styles.listContainerBg, {right: 0}]}
            source={require('../../assets/img/container-bg.png')}>
          </ImageBackground>
          <ListView 
            contentContainerStyle={styles.listContainer}
            initialListSize={4}
            dataSource={this.state.cardData}
            renderRow={(rowData) =>
              <HomeGridItem
                serialNumber={'#00' + rowData.index}
                name={rowData.nameCN}
                abilities={rowData.abilities}
                imageSource={rowData.img}
                isLike={rowData.isLike}
                containerStyle={styles.cardContainer}
                imageStyle={styles.cardImageStyle}
                onPress={this._goPokemonDetail}
              />
            }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    flex: 1,
    alignItems: 'center',
    // backgroundColor: colors.mainThemeColor,
    paddingTop: 30
  },
  headerTitle: {
    color: colors.mainThemeColor,
    fontSize: 18,
    fontWeight: '500',
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 80,
    width: screen.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  listContainerBg: {
    width: screen.width * .058,
    height: screen.height,
    flex: 1,
    position: 'absolute'
  },
  cardContainer: {
    width: screen.width / 2 - 30,
    ...Platform.select({
      ios: {
        // height: screen.width / 2 * 1.3,
      },
      android: {
        // height: screen.width / 2 * 1.4,
      }
    }),
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    overflow: 'hidden'
  }
})
