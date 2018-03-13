/**
 * animations
 * flow
 */

import { Animated } from 'react-native'

/**
 * base animation
*/
class Animation {
  animatedValue: Ojbect
  animations: Object

  constructor(initialValue: ?number = 0) {
    this.animatedValue = new Animated.Value(initialValue)
    this.animations = this.createAnimations()
  }

  createAnimations(): Object {
    return {}
  }
}

/**
 * bounce animation
*/
class BounceAnimation extends Animation {
  animatedValue: Object

  start(toValue: number, velocity: number, bounciness: number, callback: func) {
    Animated.spring(this.animatedValue, {
      toValue,
      velocity,
      bounciness,
    }).start(callback)
  }

  createAnimations(): Object {
    return { transform: [{scale: this.animatedValue}] }
  }
}

/**
 * fade animation
 * <initial> let animation = new FadeAnimation(initialOpacity?, duration?)
 * <start animation> animation.start(toOpacity, duration?, callback?)
*/
class FadeAnimation extends Animation {
  animatedValue: Object
  animationDuration: number
  constructor(initialValue = 1, animationDuration = 200) {
    super(initialValue)

    this.animationDuration = animationDuration
  }

  start(toValue, animationDuration: number, callback: func) {
    Animated.timing(this.animatedValue, {
      toValue,
      duration: this.animationDuration,
    }).start()
  }

  createAnimations(): Object {
    return { opacity: this.animatedValue }
  }
}

export {
  BounceAnimation,
  FadeAnimation,
}
