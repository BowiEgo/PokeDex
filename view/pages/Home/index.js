import React, { Component } from 'react'
import {
  FlatList,
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
import colors from '../../common/colors'

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
          img: require('../../assets/img/001.png')
        },
        {
          index: '2',
          name: 'Ivysaur',
          img: require('../../assets/img/002.png')
        },
        {
          index: '3',
          name: 'Venusaur',
          img: require('../../assets/img/003.png')
        },
        {
          index: '4',
          name: 'Charmander',
          img: require('../../assets/img/004.png')
        },
        {
          index: '5',
          name: 'Charmeleon',
          img: require('../../assets/img/005.png')
        },
        {
          index: '6',
          name: 'Charizard',
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
        <ListView 
          contentContainerStyle={styles.listContainer}
          initialListSize={4}
          dataSource={this.state.cardData}
          renderRow={(rowData) =>
            <HomeGridItem
              serialNumber={'#00' + rowData.index}
              name="Bulbasaur"
              imageSource={rowData.img}
              containerStyle={styles.cardContainer}
              imageStyle={styles.cardImageStyle}
            />
          }
        />
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
  listContainer: {
    // backgroundColor: '#f6f6f6',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    width: screen.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardContainer: {
    width: screen.width / 2 - 14,
    ...Platform.select({
      ios: {
        height: screen.width / 2 * 1.3,
      },
      android: {
        height: screen.width / 2 * 1.4,
      }
    }),
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden'
  }
})
