// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  ART,
  Easing,
  findNodeHandle,
  StyleSheet,
  UIManager,
  View
} from 'react-native'

import {
  Transitioner,
  addNavigationHelpers
} from 'react-navigation'

import type { NavigationTransitionProps } from 'NavigationTypeDefinition'

import { screen } from '../common/utils'

import Circle from '../components/Shapes/Circle'
const AnimatedSurface = Animated.createAnimatedComponent(ART.Surface)
const AnimatedShape = Animated.createAnimatedComponent(ART.Shape)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default class ExpandCircleTransitioner extends React.Component {
  constructor() {
    super()
    this.state = {
      animationProgress: 0
    }
  }

  componentDidMount() {
    console.log('heh')
    Animated.timing(this.state.animationProgress, {
      toValue: 1,
      duration: 600,
    }).start()
  }

  _configureTransition(transitionProps, prevTransitionProps) {
    return {
      duration: 600,
      // easing: Easing.out(Easing.ease)
    }
  }

  _renderOverlaySolid = (props: NavigationTransitionProps, prevProps: NavigationTransitionProps) => {
    const { progress, position, scene } = props
    const { index } = scene

    let animationProgress = this.state.animationProgress
    console.log(animationProgress)
    // let radius = this.state.animationProgress.interpolate({
    //   inputRange: [0, 0.4999, 0.5, 1],
    //   outputRange: [0, 1999, 2000, 2000]
    // })
    // console.log(radius)

    const width = this.state.animationProgress.interpolate({
      inputRange: [0, 0.00001, 0.99999, 1],
      outputRange: [0, screen.width * 1, screen.width * 1, 0]
    })

    const height = this.state.animationProgress.interpolate({
      inputRange: [0, 0.00001, 0.99999, 1],
      outputRange: [0, screen.height * 1, screen.height * 1, 0]
    })
    // const opacity = animationProgress.interpolate({
    //   inputRange: [0, 0.00001, 0.99999, 1],
    //   outputRange: [0, 1, 1, 0]
    // })

    // const scale = animationProgress.interpolate({
    //   inputRange: [0, 0.99999, 1],
    //   outputRange: [0, 10, 10]
    // })

    const borderWidth = animationProgress.interpolate({
      inputRange: [0, 0.5499, 0.55, 0.99999, 1],
      outputRange: [0, 1999, 2000, 1, 0]
    })

    // const animatedStyle = {
    //   opacity: opacity,
    //   borderWidth: borderWidth,
    //   transform: [{
    //     scale: scale
    //   }]
    // }

    // const { Path } = ART
    
    // const path = new Path()
    //   .moveTo(screen.width / 2, screen.height / 2)
    //   .arc(screen.width / 2, screen.height / 2, 50, 50)
    //   .close()

    const offset = {
      left: screen.width / 2,
      top: screen.height / 2
    }

    return(
      <View>
        <AnimatedSurface width={
          this.state.animationProgress.interpolate({
            inputRange: [0, 0.00001, 0.99999, 1],
            outputRange: [0, screen.width * 1, screen.width * 1, 0]
          })
        } height={
          this.state.animationProgress.interpolate({
            inputRange: [0, 0.00001, 0.99999, 1],
            outputRange: [0, screen.height * 1, screen.height * 1, 0]
          })
        }>
          <AnimatedCircle
            radius={this.state.animationProgress.interpolate({
              inputRange: [0, 0.4999, 0.5, 1],
              outputRange: [0, 1999, 2000, 2000]
            })}
            offset={offset}
            stroke="#892265"
            strokeWidth={borderWidth} />
        </AnimatedSurface>
      </View>
    )


    // return (
    //   <Animated.View style={[styles.overlaySolid, animatedStyle]}></Animated.View>
    // )
    
  }

  // _renderOverlayLucency = (props: NavigationTransitionProps, prevProps: NavigationTransitionProps) => {
  //   const { progress, position, scene } = props
  //   const { index } = scene
  //   console.log(progress)
  //   const opacity = position.interpolate({
  //     inputRange: [0, 0.00001, 0.99999, 1],
  //     outputRange: [0, 1, 1, 0]
  //   })

  //   const scale = position.interpolate({
  //     inputRange: [0, 0.99999, 1],
  //     outputRange: [0, 9, 0]
  //   })

  //   const animatedStyle = {
  //     opacity: opacity,
  //     transform: [{
  //       scale: scale
  //     }]
  //   }

  //   return (
  //     <Animated.View style={[styles.overlay, animatedStyle]}></Animated.View>
  //   )
  // }

  _renderScene(transitionProps) {
    const { router } = this.props
    const { position, scene } = transitionProps
    const { index } = scene
    
    const Scene = router.getComponentForRouteName(scene.route.routeName)
    const navigation = addNavigationHelpers({
      ...this.props.navigation,
      state: scene.route,
    })

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.5, index - 0.4999, index, index + 0.4999, index + 0.5, index + 1],
      outputRange: [0, 0, 1, 1, 1, 0, 0]
    })
    const animatedStyle = {
      opacity: opacity
    }

    return (
      <Animated.View 
        key={scene.route.key} 
        style={[styles.scene, animatedStyle]}>
        <Scene navigation={navigation}/>
      </Animated.View>
    )
  }

  _render = (props: NavigationTransitionProps, prevProps: NavigationTransitionProps) => {
    const scenes = props.scenes.map(scene => this._renderScene({ ...props, scene }))
    const overlaySolid = this._renderOverlaySolid(props, prevProps)
    // const overlayLucency = this._renderOverlayLucency(props, prevProps)
    return (
      <View style={styles.scenes}>
        {scenes}
        {overlaySolid}
      </View>
    )
  }

  render() {
    return (
      <Transitioner 
        configureTransition={this._configureTransition}
        navigation={this.props.navigation}
        style={this.props.style}
        render={this._render}
      />
    )
  }
}

const styles = StyleSheet.create({
  scenes: {
    flex: 1
  },
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlaySolid: {
    width: 200,
    height: 200,
    borderRadius: 100,
    transform: [{
      scale: 0
    }],
    // backgroundColor: 'yellow',
    borderWidth: 100,
    borderColor: 'green',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayLucency: {
    width: 200,
    height: 200,
    borderRadius: 100,
    transform: [{
      scale: 0
    }],
    // backgroundColor: 'yellow',
    borderWidth: 10,
    borderColor: 'yellow',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})
