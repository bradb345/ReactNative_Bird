import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})



export default function App() {

  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const grivity = 15
  let gameTimerId 
  let obstaclesLeftTimerId 
  let obstaclesLeftTimerIdTwo 

  ////////////////////////////////////////////////////////////////////////////////////!
  //! Bird


  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - grivity)
      }, 30)
      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////!
  // ! obstacle one


  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random() * 100)
      setScore(score => score + 1)
    }
  }, [obstaclesLeft])

  //////////////////////////////////////////////////////////////////////////////////////////////!
  // ! obstacle two


  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(- Math.random() * 100)
      setScore(score => score + 1)

    }
  }, [obstaclesLeftTwo])

  ////////////////////////////////////////////////////////////////////////////////////////////////////!
  //! collisions 

  useEffect(() => {
    if (
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) || birdBottom > (obstaclesNegHeight + obstacleHeight + gap - 30)) && (obstaclesLeft > screenWidth / 2 - 30 && obstaclesLeft < screenWidth / 2 + 30))
      ||
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) || birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap - 30)) && (obstaclesLeftTwo > screenWidth / 2 - 30 && obstaclesLeftTwo < screenWidth / 2 + 30))
    ) {
      console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
    setIsGameOver(true)
    
  }


  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>{score}</Text>}
        <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
        />
        <Obstacles
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          obstaclesLeft={obstaclesLeft}
          gap={gap}
          randomBotton={obstaclesNegHeight}
        />

        <Obstacles
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          obstaclesLeft={obstaclesLeftTwo}
          gap={gap}
          randomBotton={obstaclesNegHeightTwo}
        />
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>

  )
}

