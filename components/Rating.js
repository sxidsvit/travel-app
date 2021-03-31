import React from 'react'
import { View, Image } from 'react-native'
import { icons } from '../constants'

const Rating = ({ containerStyle, rate }) => {

  const starComponents = []

  for (let i = 0; i < rate; i++) {
    starComponents.push(
      <Image
        source={icons.star}
        key={`star-${i}`}
        resizeMode='contain'
        style={{
          marginLeft: i == 0 ? 0 : 5,
          width: 15,
          height: 15
        }}
      />
    )
  }

  return (
    <View style={{ flexDirection: 'row', ...containerStyle }}>
      {starComponents}
    </View>
  )
}

export default Rating
