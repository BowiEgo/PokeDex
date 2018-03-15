/**
 * animations
 * @flow
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
 * @initialValue {scale}
*/
class BounceAnimation extends Animation {
  animatedValue: Object

  /**
   * start
   * https://facebook.github.io/react-native/docs/animated.html#spring
   * @prop {toValue} 目标值，类型：number
   * @prop {velocity} 初始速度，类型：number
   * @prop {bounciness} 回弹阈值，类型：number
   * @prop {callback} 动画完成后的回调方法，类型：function
  */
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

  /**
   * start
   * https://facebook.github.io/react-native/docs/animated.html#timing
   * @prop {toValue} 目标值，类型：number
   * @prop {animationDuration} 动画时长，类型：number，单位：ms
   * @prop {callback} 动画完成后的回调方法，类型：function
  */
  start(toValue, animationDuration: number, callback: func) {
    Animated.timing(this.animatedValue, {
      toValue,
      duration: this.animationDuration,
    }).start(callback)
  }

  createAnimations(): Object {
    return { opacity: this.animatedValue }
  }
}

export {
  BounceAnimation,
  FadeAnimation,
}
