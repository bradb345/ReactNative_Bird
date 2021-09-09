import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  bird:{
    position: 'absolute',
    backgroundColor: 'dodgerblue',
  }
})

function Bird({birdBottom, birdLeft}){

  const birdWidth = 50
  const birdHeight = 60

  return (
    <View style={{...styles.bird, 
      bottom: birdBottom - (birdHeight/2), 
      left: birdLeft - (birdWidth /2),
      width: birdWidth,
      height: birdHeight,
    }}/>

    
  )
}

export default Bird