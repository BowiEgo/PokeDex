import {
  Dimensions,
  Platform,
  PixelRatio
} from 'react-native'

const screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  onePixel: 1 / PixelRatio.get(),
  statusBarHeight: (Platform.OS === 'ios' ? 20 : 0)
}

const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export {
  screen,
  sleep
}
