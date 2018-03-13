/**
 * animations
 * flow
 */

import { Animated } from 'react-native'

/**
 * base animation
*/
class Animation {
  animate: Ojbect
  animations: Object

  constructor(toValue: ?number = 0) {
    this.animate = new Animated.Value(toValue)
    this.animation = this.createAnimations()
  }

  createAnimations(): Object {
    return {}
  }
}

type Param = {
  toValue?: number
  animationDuration?: number
}

/**
 * bounce animation
*/
class BounceAnimation extends Animation {
  animate: Object

  toValue(toValue: number) {
    Animated.spring(this.animate, {
      toValue,
      duration: this.animationDuration,
      velocity,
      bounciness,
    }).start()
  }

  createAnimations(): Object {
    return { transform: [{scale: this.animate}] }
  }
}

/**
 * fade animation
*/
class FadeAnimation extends Animation {
  animate: Object
  animationDuration: number
  constructor({ toValue = 0, animationDuration = 200 }: Param) {
    super(toValue)

    this.animationDuration = animationDuration
  }

  toValue(toValue: number) {
    Animated.timing(this.animate, {
      toValue,
      duration: this.animationDuration,
    }).start()
  }

  createAnimations(): Object {
    return { opacity: this.animate }
  }
}

export {
  BounceAnimation,
  FadeAnimation
}
