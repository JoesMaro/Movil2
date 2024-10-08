import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'



export const Productoscomponent = () => {
  return (
<View>
<View>
<Text variant='labelLarge'>Nombre:</Text>
   <Text variant='bodyMedium'>Precio:</Text>
</View>
<View>
<IconButton
    icon="wheel-barrow"
    size={20}
    mode='contained'
    onPress={() => console.log('Pressed')}
  />
</View>
</View>


  )
}
