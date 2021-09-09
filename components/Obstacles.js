import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  obstacle:{
    position: 'absolute',
    backgroundColor: 'green',
    
  }
})

function Obstacles({obstaclesLeft, obstacleWidth, gap, obstacleHeight, randomBotton}){

  



  return (
    <>
      <View style={{...styles.obstacle,
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstaclesLeft,
        bottom: randomBotton + obstacleHeight + gap,
      }}/>
      <View style={{...styles.obstacle,
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstaclesLeft,
        bottom: randomBotton,
      }}/>
    </>
  )

}

export default Obstacles