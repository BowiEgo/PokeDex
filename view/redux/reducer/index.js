import * as ActionTypes from '../actionTypes'
import colors from '../../common/colors'
console.log(colors)

const initialState = {
  theme: {
    mainThemeColor: colors['theme1'].mainThemeColor,
    subThemeColor: colors['theme1'].subThemeColor
  }
}

const reducer = (state = initialState, action) => {
  let newState = state
  switch (action.type) {
    case ActionTypes.CHANGE_THEME:
      newState = Object.assign({}, state, {
        theme: {
          mainThemeColor: colors[action.value].mainThemeColor,
          subThemeColor: colors[action.value].subThemeColor
        }
      })
      return state
    default:
     return state
  }
}

export default reducer
