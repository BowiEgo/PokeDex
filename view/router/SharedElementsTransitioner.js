import * as React from 'react'
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

class SharedItem extends React.Component {
  render() {
    return (
      <View collapsable={false}>
        {this.props.children}
      </View>
    )
  }
}

class SharedView extends React.Component {
  static contextTypes = {
    registerSharedView: React.PropTypes.func,
    unregisterSharedView: React.PropTypes.func
  }

  componentDidMount() {
    const { registerSharedView } = this.context
    if (!registerSharedView) return

    const nativeHandle = findNodeHandle(this._ref)
    const { name, containerRouteName } = this.props
    registerSharedView(new SharedItem(
      name,
      containerRouteName,
      this.render(),
      nativeHandle
    ))
  }

  componentWillUnmount() {
    const { unregisterSharedView } = this.context
    if (!unregisterSharedView) return

    const { name, containerRouteName } = this.props
    unregisterSharedView(name, containerRouteName)    
  }

  render() {
    return (
      <View
        ref={c => this._ref = c}>
        {this.props.children}
      </View>
    )
  }
}

export default class SharedElementsTransitioner extends React.Component {

  static childContextTypes = {
    registerSharedView: React.PropTypes.func,
    unregisterSharedView: React.PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState: State) {
    return this.props !== nextProps ||
      nextState.itemToMeasure.length === 0
  }

  _getChildContext = () => {
    return {
      registerSharedView(sharedItem: SharedItem) {
        this.addSharedItem(sharedItem)
        const { name, containerRouteName } = sharedItem

        const matchingItem = self.state.sharedItems.findMatchByName(name, containerRouteName)

        if (matchingItem) {
          self.setState((prevState: State) => {
            sharedItems: prevState.sharedItems,
            itemToMeasure: [...prevState.itemToMeasure, sharedItem, matchingItem]
          })
        }
      },
      unregisterSharedView(name: string, containerRouteName: string) {
        ...
      }
    }
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

  _onLayout = async () => {
    let toUpdate = []

    for (let item of this.state.itemToMeasure) {
      const { name, containerRouteName } = item
      const metrics = await this._measure(item)
      toUpdate.push({ name, containerRouteName, metrics })
    }
    if (toUpdata.length > 0) {
      this.setState((prevState: State): State => {
        sharedItems: prevState.sharedItems.updateMetrics(toUpdate),
        itemToMeasure: []
      })
    }
  }

  _configureTransition(transitionProps, prevTransitionProps) {
    return {
      duration: 1000,
      easing: Easing.out(Easing.ease)
    }
  }

  _render = (transitionProps, prevTransitionProps) => {
    const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene))
    const overlay = this._renderOverlay()
    return (
      <View style={{ flex: 1 }}>
        {scenes}
        {overlay}
      </View>
    )
  }

  _renderScene = (transitionProps, scene) => {
    const { navigation, router } = this.props
    const { routes } = navigation.state
    const { position } = transitionProps
    const { index } = scene

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.01, index, index + 0.99, index + 1],
      outputRange: [0, 0, 1, 1, 0]
    })

    const animation = {
      opacity: opacity
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
      <Animated.View 
        key={index} 
        style={[styles.view, animation]}
        onLayout={this._onLayout}>
        <Scene
          navigation={addNavigationHelpers({
            ...navigation,
            state: routes[index]
          })}
        />
      </Animated.View>
    )
  }

  _renderOverlay = () => {
    const sharedViews = this._cloneAndAnimateSharedViews(...)

    return (
      <Animated.View style={overlayStyle}>
        {sharedViews}
      </Aniamted.View>
    )
  }

  _cloneAndAnimateSharedViews = (transitionProps, prevTransitionProps) => {
    const shareViewPairs = this._collectActiveSharedViewPairs(transitionProps, prevTranstionProps)
    
    return shareViewPairs.map(pair => {
      const bboxFrom = this._getBoundingBox(pair.fromItem)
      const bboxTo = this._getBoundingBox(pair.toItem)
      const animatedStyle = this.createAnimatedStyle(bboxFrom, bboxTo)
      const cloned = React.cloneElement(pair.fromItem)

      return (
        <Animated.View style={animatedStyle}>
          {cloned}
        </Animated.View>
      )
    })
  }

  _collectActiveSharedViewPairs = (transitionProps, prevTransitionProps) => {

  }

  _getBoundingBox = (sharedView) => {

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


