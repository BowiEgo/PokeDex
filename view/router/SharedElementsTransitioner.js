// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
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

import SharedItems from './SharedItems'
import type { Metrics, SharedItem, UpdateRequest } from './SharedItems'


type State = {
  sharedItems: SharedItems,
  itemsToMeasure: Array<SharedItem>
}

export default class SharedElementsTransitioner extends React.Component {

  static childContextTypes = {
    registerSharedView: PropTypes.func,
    unregisterSharedView: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      sharedItems: new SharedItems(),
      itemsToMeasure: [],
    }
  }

  shouldComponentUpdate(nextProps, nextState: State) {
    return this.props !== nextProps ||
      nextState.itemToMeasure.length === 0
  }

  _measure(sharedItem: SharedItem): Promise<Metrics> {
    return new Promise((resolve, reject) => {
      UIManager.measureInWindow(
        sharedItem.nativeHandle,
        (x, y, width, height) => {
          resolve({ x, y, width, height })
        }
      )
    })
  }

  _setSharedItemsState(func: (prevState: State) => sharedItem, callback) {
    this.setState((prevState) => (
      { sharedItem: func(prevState) }
    ), callback)
  }

  _addSharedItem(sharedItem: SharedItem) {
    this._setSharedItemsState(prevState => 
      prevState.sharedItems.add(sharedItem)
    )
  }

  _removeSharedItem(name: string, containerRouteName: string) {
    this._setSharedItemsState(prevState =>
      prevState.sharedItems.remove(name, containerRouteName)
    )
  }

  _getChildContext = () => {
    return {
      registerSharedView(sharedItem: SharedItem) {
        this._addSharedItem(sharedItem)
        const { name, containerRouteName } = sharedItem

        const matchingItem = self.state.sharedItems.findMatchByName(name, containerRouteName)

        if (matchingItem) {
          self.setState((prevState: State) => ({
            sharedItems: prevState.sharedItems,
            itemToMeasure: [...prevState.itemToMeasure, sharedItem, matchingItem]
          }))
        }
      },
      unregisterSharedView(name: string, containerRouteName: string) {
        this._removeSharedItem(name, containerRouteName)
      }
    }
  }

  _onLayout = async () => {
    let toUpdate = []

    for (let item of this.state.itemToMeasure) {
      const { name, containerRouteName } = item
      const metrics = await this._measure(item)
      toUpdate.push({ name, containerRouteName, metrics })
    }
    if (toUpdata.length > 0) {
      this.setState((prevState: State): State => ({
        sharedItems: prevState.sharedItems.updateMetrics(toUpdate),
        itemToMeasure: []
      }))
    }
  }

  _configureTransition(transitionProps, prevTransitionProps) {
    return {
      duration: 1000,
      // easing: Easing.out(Easing.ease)
    }
  }

  _render = (props: NavigationTransitionProps, prevProps: NavigationTransitionProps) => {
    const scenes = props.scenes.map(scene => this._renderScene({ ...props, scene }))
    const overlay = this._renderOverlay(props, prevProps)
    return (
      <View style={style.scenes}>
        {scenes}
        {overlay}
      </View>
    )
  }

  _renderScene = (transitionProps) => {
    const { router } = this.props
    // const { routes } = navigation.state
    const { position, scene, progress } = transitionProps
    const { index } = scene
    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.01, index, index + 0.99, index + 1],
      outputRange: [0, 0, 1, 1, 0]
    })

    const animateStyle = {
      opacity: opacity
    }

    const Scene = router.getComponentForRouteName(scene.route.routeName)
    const navigation = this._getChildNavigation(scene)

    return (
      <Animated.View 
        key={scene.route.key} 
        style={[styles.scene, animateStyle]}
        onLayout={this._onLayout}>
        <Scene navigation={navigation}/>
        {this._renderDarkeningOverlay(progress, position, index)}
      </Animated.View>
    )
  }

  _getChildNavigation = (scene: NavigationScene): NavigationScreenProp<NavigationRoute, NavigationAction> => {
    if (!this._childNavigationProps) this._childNavigationProps = {}
    let navigation = this._childNavigationProps[scene.key]
    if (!navigation || navigation.state !== scene.route) {
      navigation = this._childNavigationProps[scene.key] = addNavigationHelpers({
        ...this.props.navigation,
        state: scene.route,
      })
    }
    return navigation
  }

  _getOverlayContainerStyle(progress) {
    const left = progress.interpolate({
      inputRange: [0, 0.99999, 1],
      outputRange: [0, 0, 100000]
    })

    return { left }
  }

  _getSharedElementStyle(props, prevProps, fromItem, toItem) {
    const { position, progress, navigationState: {index} } = props

    const getElementType = (item) => {
      const type = item.createElement.type
      return type && (type.displayName || type.name)
    }

    const animatedWidthHeight = (fromItem, toItem) => {
      const width = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [fromItem.metrics.width, toItem.metrics.width]
      })
      const height = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [fromItem.metrics.height, toItem.metrics.height]
      })
      return { width, height }
    }

    const animatedScale = (fromItem, toItem) => {
      const toVsFromScaleX = toItem.scaleRelativeTo(fromItem).x
      const toVsFromScaleY = toItem.scaleRelativeTo(fromItem).y

      const scaleX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, toVsFromScaleX]
      })
      const scaleY = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, toVsFromScaleY]
      })
      const left = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [fromItem.metrics.x, toItem.metrics.x + fromItem.metrics.width / 2 * (toVsFromScaleX - 1)]
      })
      const top = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [fromItem.metrics.y, toItem.metrics.y + fromItem.metrics.height / 2 * (toVsFromScaleY - 1)]
      })

      return {
        top,
        left,
        transform: [{
          scaleX,
          scaleY
        }]
      }
    }

    const animatedFontSize = (fromItem, toItem) => {
      const getFontSize = element => (element.props && element.props.fontSize) || 12
      return {
        fontSize: progress.interpolate({
          inputRange: [0, 1],
          outputRage: [getFontSize(fromItem.reactElement), getFontSize(toItem.reactElement)]
        })
      }
    }

    const elementType = getElementType(fromItem)
    let animatedStyle
    switch(elementType) {
      case 'Image': 
        animatedStyle = animatedWidthHeight(fromItem, toItem)
        break
      case 'Text':
        animatedStyle = {
          ...animatedWidthHeight(fromItem, toItem),
          ...animatedFontSize(fromItem, toItem)
        }
        break
      default:
        animatedStyle = animateScale(itemFrom, itemTo)
    }

    const left = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [fromItem.metrics.x, toItem.metrics.x]
    })
    const top = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [fromItem.metrics.y, toItem.metrics.y]
    })

    return {
      position: 'absolute',
      left,
      top,
      right: null,
      bottom: null,
      ...animatedStyle,
      elevation: this._interpolateElevation(props, prevProps, 1), // make sure shared elements stay above the faked container
    }
  }

  _interpolateElevation(props, prevProps, base: number) {
    const { position, navigationState: {index} } = props
    const prevIndex = prevProps.navigationState.index
    const minIdx = Math.min(index, prevIndex)
    const maxIdx = Math.max(index, prevIndex)

    return position.interpolate({
        inputRange: [minIdx, maxIdx],
        outputRange: [5 + base, 25 + base],
    })
  }

  _renderFakedSEContainer(pairs, props, prevProps) {
    if (!prevProps || pairs.length === 0) return null

    const fromItemBBox = this._getBBox(pairs.map(p => p.fromItem.metrics))
    const toItemBBox = this._getBBox(pairs.map(p => p.toItem.metrics))
    const { position, progress, navigationState: {index} } = props
    const prevIndex = prevProps.navigationState.index
    const minIdx = Math.min(index, prevIndex)
    const maxIdx = Math.max(index, prevIndex)
    const inputRange = [minIdx, maxIdx]
    const adaptRange = (range) => index > prevIndex ? range : range.reverse()
    const left = position.interpolate({
        inputRange,
        outputRange: adaptRange([fromItemBBox.left, toItemBBox.left]),
    })
    const top = position.interpolate({
        inputRange,
        outputRange: adaptRange([fromItemBBox.top, toItemBBox.top]),
    })
    const { height: windowHeight, width: windowWidth } = Dimensions.get("window")
    const width = position.interpolate({
        inputRange,
        outputRange: [index > prevIndex ? fromItemBBox.width : toItemBBox.width, windowWidth],
    })
    const height = position.interpolate({
        inputRange,
        outputRange: [index > prevIndex ? fromItemBBox.height : toItemBBox.height, windowHeight],
    })
    const elevation = this._interpolateElevation(props, prevProps, 0)
    const style = {
        backgroundColor: '#e2e2e2',
        elevation,
        position: 'absolute',
        left,
        top,
        right: null,
        bottom: null,
        width,
        height,
    }
    return <Animated.View style={style} />
  }

  _renderDarkeningOverlay(progress, position, sceneIndex: number) {
    const backgroundColor = position.interpolate({
      inputRange: [sceneIndex - 1, sceneIndex, sceneIndex + 0.2, sceneIndex + 1],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.5)']
    })
    const animatedStyle = {
      elevation: 5,
      backgroundColor,
      ...this._getOverlayContainerStyle(progress)
    }
    return <Animated.View style={[styles.overlay, animatedStyle]}/>
  }

  _renderOverlay = (props: NavigationTransitionProps, prevProps: NavigationTransitionProps) => {
    const fromRoute = prevProps ? prevProps.scene.route.routeName : 'unknownRoute'
    const toRoute = props.scene.route.routeName
    const pairs = this.state.sharedItems.getMeasuredItemPairs(fromRoute, toRoute)

    const sharedElements = pairs.map((pair, idx) => {
      const { fromItem, toItem } = pair
      const animatedStyle = this._getSharedElementStyle(props, prevProps, fromItem, toItem)
      const element = fromItem.reactElement
      const AnimatedComp = Animated.createAnimatedComponent(element.type)
      return React.createElement(AnimatedComp,
        { ...element.props, style: [element.props.style, animatedStyle], key: idx },
        element.props.children
      )
    })

    const containerStyle = this._getOverlayContainerStyle(props.progress)
    return (
      <Animated.View style={[styles.overlay, this.props.style, containerStyle]}>
        {this._renderFakedSEContainer(pairs, props, prevProps)}
        {sharedElements}
      </Animated.View>
    )
  }

  render() {
    const { navigation, style } = this.props
    return (
      <Transitioner 
        configureTransition={this._configureTransition}
        navigation={navigation}
        style={style}
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
  overlay: {
    position: 'absolute',
    left: 100000,
    right: 0,
    top: 0,
    bottom: 0,
  }
})


