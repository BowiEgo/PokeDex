import React from 'react'
import { Platform } from 'react-native'

import { TabNavigator, StackNavigator } from 'react-navigation'
import HomePage from '../pages/Home'
import DiscoverPage from '../pages/Discover'
import StorePage from '../pages/Store'
import UserPage from '../pages/User'

import SearchPage from '../pages/Search'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const myIcon = (iconName, color) => {
  return (<Icon name={iconName} size={20} color={color} />)
}

const TabNavConfig = (label, icon) => {
  return {
    tabBarLabel: label,
    tabBarIcon: ({tintColor}) => (
      myIcon(icon, tintColor)
    ),
  }
}

const HomeDrawerNav = StackNavigator(
  {
    Home: {
      screen: HomePage,
    },
    Search: {
      screen: SearchPage
    }
  }
)

const TabNav = TabNavigator(
  {
    Home: {
      screen: HomeDrawerNav,
      navigationOptions: TabNavConfig('首页', 'home')
    },
    Discover: {
      screen: DiscoverPage,
      navigationOptions: TabNavConfig('发现', 'looks')
    },
    Store: {
      screen: StorePage,
      navigationOptions: TabNavConfig('商店', 'store')
    },
    User: {
      screen: UserPage,
      navigationOptions: TabNavConfig('我的', 'account')
    },
  }, {
    tabBarPosition: 'bottom',
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#ff9999',
      inactiveTintColor: '#c0c0c0',
      style: {
        paddingBottom: 4,
        ...Platform.select({
          ios: {
            borderTopWidth: 0.4,
            borderTopColor: '#fff',
            shadowColor: '#c0c0c0',
            shadowOffset: {
              width: 4,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
          android: {
          }
        }),
        backgroundColor: 'transparent',
      },
    },
  }
)

export {
  TabNav,
  HomeDrawerNav
}