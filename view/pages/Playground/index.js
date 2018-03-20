/* 
 * PlaygroundPage
 * @flow
*/ 
"use strict"

import React, { Component } from 'react'
import {
  ART,
  Image,
  StyleSheet,
  View
} from 'react-native'

import { screen } from '../../common/utils'

import TouchableBounce from '../../components/TouchableBounce'
import TouchableFade from '../../components/TouchableFade'

import { ButtonComponent } from '../../components/Button'

/* <PlaygroundPage />
============================================================================= */

type Props = {
}

export default class PlaygroundPage extends Component<{}> {

  constructor(props) {
    super(props)
  }

  render() {
    const {Surface, Shape, Path} = ART
    
    const path = new Path()
      .moveTo(50,1)
      .arc(0,99,25)
      .arc(0,-99,25)
      .close()

    return(
      <View style={[styles.container]}>
        <ART.Surface width={screen.width} height={screen.height}>
          <ART.Shape d={path} stroke="#892265" strokeWidth={10} />
        </ART.Surface>
      </View>
    )
    // return (
    //   <View style={styles.container}>
    //     <TouchableBounce>
    //       <Image source={require('../../assets/img/001.png')}/>
    //     </TouchableBounce>
    //     <TouchableFade
    //       duration={500}
    //       fadeStatus="in">
    //       <Image source={require('../../assets/img/002.png')}/>
    //     </TouchableFade>
    //     {/* <ButtonComponent></ButtonComponent> */}
    //   </View>
    // )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center'
  }
})