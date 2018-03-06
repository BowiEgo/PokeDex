import { createStore } from 'redux'

import rootReducer from '../reducer/index'

let store = createStore(rootReducer)

export default store
