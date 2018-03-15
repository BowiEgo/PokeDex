import * as React from 'react-native'
import ButtonComponent from './ButtonComponent'

export default const RoundButton = (props) => {
  return (
    <ButtonComponent
      {...props}
      shape="round"
      width={props.width}
      height={props.height}
    />
  )
}
