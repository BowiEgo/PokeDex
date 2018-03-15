import * as React from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  View
} from 'react-native'
import {
  Transitioner,
  addNavigationHelpers
} from 'react-navigation'

export default class CustomNavigationView extends React.Component {

  _configureTransition(transitionProps, prevTransitionProps) {
    return {
      duration: 200,
      easing: Easing.out(Easing.ease)
    }
  }

  _render = (transitionProps, prevTransitionProps) => {
    const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene))
    return (
      <View style={{ flex: 1 }}>
        {scenes}
      </View>
    )
  }

  _renderScene = (transitionProps, scene) => {
    const { navigation, router } = this.props
    const { routes } = navigation.state
    const { position } = transitionProps
    const { index } = scene

    const animatedValue = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0]
    })

    const animation = {
      opacity: animatedValue,
      transform: [
        { scale: animatedValue }
      ]
    }

    const Scene = router.getComponentForRouteName(scene.route.routeName)

    if(scene.route.routeName === 'Search') {
      return (
        <View key={index} style={[styles.view]}>
          <Scene
            navigation={addNavigationHelpers({
              ...navigation,
              state: routes[index]
            })}
          />
        </View>
      )
    }
    return (
      <Animated.View key={index} style={[styles.view, animation]}>
        <Scene
          navigation={addNavigationHelpers({
            ...navigation,
            state: routes[index]
          })}
        />
      </Animated.View>
    )
  }

  render() {
    const { navigation, router } = this.props
    return (
      <Transitioner 
        configureTransition={this._configureTransition}
        navigation={navigation}
        render={this._render}
      />
    )
  }
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})


