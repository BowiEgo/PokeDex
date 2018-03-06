import * as ActionTypes from '../actionTypes'

export const changeTheme = argument => {
  return {
    type: ActionTypes.CHANGE_THEME,
    value: argument
  }
}


